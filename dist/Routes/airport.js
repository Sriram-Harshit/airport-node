"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const airportController_1 = require("../Controllers/airportController");
const validation_1 = require("../Middlewares/validation");
const router = express_1.default.Router();
router.get("/:iata_code", validation_1.ValidateIATA, airportController_1.getAirportInfo);
exports.default = router;
