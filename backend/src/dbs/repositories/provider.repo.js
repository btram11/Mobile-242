const { PrismaClient } = require("@prisma/client");
const { sortBy } = require("../../service/book.service");
const { search } = require("../../routes");

const prisma = new PrismaClient();

const getBookByProvider = (id, offset, limit) => {
    return prisma.provider.findMany({
        where: {
            provider_id: id
        },
        include: {
            listed_book: {
                skip: offset,
                take: limit
            }
        }
    })
}

const getProviders = async (
    page,
    pageSize,
    name=null,
    sortBy=""
) => {
    take = pageSize
    skip = (page - 1)*pageSize
    const nameCondition = {}
    const orderBy = {}

    if (name) {
        nameCondition.provider_name = { search: name }
        console.log(nameCondition)
        if (sortBy == "") {
            orderBy._relevance = {
                fields: ['provider_name'],
                search: name,
                sort: 'desc',
            }
        }
    }
    
    try {
        result = await prisma.provider.findMany({
            take,
            skip,
            where: nameCondition,
            orderBy
    })
        return result
    }
    catch (error) {
        console.log(error)
    }
}

const getProviderById = async (id) => {
    try {
        result = await prisma.provider.findUnique({
            where: {
                provider_id: id
            }
        })
        return result
    }
    catch (error) {
        console.log(error)
    }
}
module.exports = {getBookByProvider, getProviderById, getProviders}
