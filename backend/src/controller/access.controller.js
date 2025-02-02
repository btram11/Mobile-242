"use strict";
const AccessService = require("../service/access.service");
const { SuccessResponse } = require("../core/success.response");

class AccessController {
  login = async (req, res) => {
    const response = await AccessService.login(req.body);
    return res.status(200).json(response);
  };

  logout = async (req, res) => {
    const response = await AccessService.logout({
      access_token: req.headers["authorization"],
      id: req.headers["client_id"],
    });
    return res.status(200).json(response);
  };

  resetPassword = async (req, res) => {
    const response = await AccessService.resetPassword(req.body);
    return res.status(200).json(response);
  };
}

module.exports = new AccessController();
