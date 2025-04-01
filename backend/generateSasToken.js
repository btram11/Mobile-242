const { BlobServiceClient } = require("@azure/storage-blob");

const generateSasUrl = async (blobName) => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
  );
  const containerClient = blobServiceClient.getContainerClient(
    process.env.AZURE_STORAGE_CONTAINER_NAME
  );
  const blobClient = containerClient.getBlobClient(blobName);
  const sasUrl = await blobClient.generateSasUrl({
    permissions: "r",
    expiresOn: new Date(new Date().valueOf() + 10 * 1000),
  });
  return sasUrl;
};

id = "00000000-0000-0000-0000-000000000000";
blobName = `${id}.jpg`;

generateSasUrl(blobName).then((url) => {
  console.log(url);
});
