const { PrismaClient } = require("@prisma/client");
const { BlobServiceClient } = require("@azure/storage-blob");
const { randomUUID } = require("crypto");
const fs = require("fs");

const prisma = new PrismaClient();
const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);
const containerClient = blobServiceClient.getContainerClient(
  process.env.AZURE_STORAGE_CONTAINER_NAME
);

const initContainer = async () => {
  const containerExists = await containerClient.exists();
  if (!containerExists) {
    await containerClient.create();
  }
};
initContainer().then(() => {});

const main = async () => {
  const tables = ["user", "provider", "database_book", "listed_book"];
  for (const table of tables.slice().reverse()) {
    await prisma[table].deleteMany();
  }

  for (const table of tables) {
    if (table === "database_book") {
      const imageFilePath = "./prisma/data/book.jpg";
      const imageContent = fs.readFileSync(imageFilePath);
      let books = require("./data/database_book.json");
      for (let book of books) {
        book.book_id = book.book_id || randomUUID();
        const blobName = `${book.book_id}.jpg`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.upload(imageContent, imageContent.length);
        book.img_url = blockBlobClient.url;
      }
      await prisma[table].createMany({
        data: books,
      });
    } else {
      await prisma[table].createMany({
        data: require(`./data/${table}.json`),
      });
    }
  }
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
