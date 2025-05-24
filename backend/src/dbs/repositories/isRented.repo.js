const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

const saveRented = async (bookId, listingId, data) => {
    const result = await prisma.is_rented.create({
        data: {
            book_id: bookId,
            listing_id: listingId,
            ...data,
        },
    });
    return result;
}

const getRenter = async (bookId, listingId) => {
    const result = await prisma.is_rented.findFirst({
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
    saveRented,
    getRenter,
};