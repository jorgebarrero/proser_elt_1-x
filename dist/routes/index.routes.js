"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORT ROUTER
const express_1 = require("express");
const router = express_1.Router();
// IMPORT CONTROLLERS
const index_controller_1 = require("../controllers/index.controller");
// DEFINE ENDPOINTS
router.route("/").get(index_controller_1.indexWelcome);
// EXPORT ROUTES
exports.default = router;
