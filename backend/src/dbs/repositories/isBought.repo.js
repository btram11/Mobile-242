const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

const saveBought = async (bookId, listingId, data) => {
    await prisma.listed_book.update({
        where: {
            book_id_listing_id: {
                book_id: bookId,
                listing_id: listingId,
            },
        },
        data: {
            is_in_progress: true,
        },
    });
    const result = await prisma.is_bought.create({
        data: {
            book_id: bookId,
            listing_id: listingId,
            ...data,
        },
    })
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

const confirmBought = async (bookId, listingId) => {
    await prisma.listed_book.update({
        where: {
            book_id_listing_id: {
                book_id: bookId,
                listing_id: listingId,
            },
        },
        data: {
            is_complete: true,
            is_in_progress: false,
        },
    });
    const result = await prisma.is_bought.update({
        where: {
            book_id_listing_id: {
                book_id: bookId,
                listing_id: listingId,
            },
        },
        data: {
            is_complete: true,
        },
    });
    return result;
}

const denyBought = async (bookId, listingId) => {
    await prisma.listed_book.update({
        where: {
            book_id_listing_id: {
                book_id: bookId,
                listing_id: listingId,
            },
        },
        data: {
            is_in_progress: false,
        },
    });
    const result = await prisma.is_bought.delete({
        where: {
            book_id_listing_id: {
                book_id: bookId,
                listing_id: listingId,
            },
        },
    });
    return result;
}

module.exports = {
    saveBought,
    getBuyer,
    confirmBought,
    denyBought
};