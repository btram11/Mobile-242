const ProviderService = require("../service/provider.service");

class ProviderController {
    getBookByProvider = async (req, res) => {
        const { id, offset, limit } = req.params;
        const response = await ProviderService.getBookByProvider(
            id,
            parseInt(offset),
            parseInt(limit)
        );
        return res.status(200).json(response);
    };

    getProviders = async (req, res) => {
        const {page, pageSize, name, sortBy} = req.query
        const response = await ProviderService.getProviders(
            parseInt(page),
            parseInt(pageSize), 
            name, sortBy)
        return res.status(200).json(response)
    }

    getProviderById = async (req, res) => {
        const { id } = req.params;
        const response = await ProviderService.getProviderById(id);
        return res.status(200).json(response);
    }
}

module.exports = new ProviderController;