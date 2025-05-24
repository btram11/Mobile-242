const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

const saveBought = async (bookId, listingId, data) => {
    const result = await prisma.is_bought.create({
        data: {
            book_id: bookId,
            listing_id: listingId,
            ...data,
        },
    });
    return result;
}

const getBuyer = async (bookId, listingId) => {
    const result = await prisma.is_bought.findFirst({
        where: {
            book_id: bookId,
            listing_id: listingId,
        },
        select: {
            user: {
                select: {
                    user_id: true,
                    username: true,
                    email: true,
                    phone_number: true,
                },
            }
        },
    });
    return result;
}

module.exports = {
    saveBought,
    getBuyer,
};