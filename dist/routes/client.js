"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("../controllers/client");
const validate_token_1 = __importDefault(require("../middlewares/validate-token"));
const service_auth_1 = __importDefault(require("../middlewares/service-auth"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, service_auth_1.default, client_1.getClients);
exports.default = router;
