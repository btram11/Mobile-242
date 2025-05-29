const { BadRequestError } = require("../core/error.response");
const { getBookByProvider, getProviderById, getProviders } = require("../dbs/repositories/provider.repo");
const { getListingsInProgressByProvider: getListingsByProvider } = require("../dbs/repositories/book.repo");

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

    static async getListings(providerId, page = 1, pageSize = 10, inProgress = false) {
        const result = await getListingsByProvider(providerId, page, pageSize, inProgress);
        if (!result) {
            throw new BadRequestError("No listings in progress found for this provider");
        }
        return result;
    }
}

module.exports = ProviderService;