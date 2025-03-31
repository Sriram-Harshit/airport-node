"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CAirport_1 = require("../Controllers/CAirport");
const router = (0, express_1.Router)();
router.get("/:iata_code", CAirport_1.getAirportInfo);
exports.default = router;
