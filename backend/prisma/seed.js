const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const main = async () => {
    // Seed user data
    const users = require('./data/users.json');
    await prisma.users.createMany({
        data: users,
    });

    // Seed other data
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })