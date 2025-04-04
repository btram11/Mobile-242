const { BadRequestError } = require("../core/error.response");
const { getBookByProvider, getProviderById, getProviders } = require("../dbs/repositories/provider.repo");

class ProviderService {
    static async getBooks(id, offset, limit) {
        const result = await getBookByProvider(id, offset, limit);
        if (!result) {
            throw new BadRequestError("Book not found");
        }
        return result;
    }

    static async getProviderById(id) {
        const result = await getProviderById(id);
        if (!result) {
            throw new BadRequestError("Provider not found")
        }
        return result
    }

    static async getProviders(
        page=1,
        pageSize=10,
        name=null,
        sortBy=""
    ) {
        const result = await getProviders(page, pageSize, name, sortBy)
        if (!result) {
            throw new BadRequestError("No providers found")
        }
        return result
    }
}

module.exports = ProviderService;