"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAirportInfo = void 0;
const DBconnector_1 = require("../Database/DBconnector");
const Airport_1 = require("../entities/Airport");
const getAirportInfo = async (req, res) => {
    try {
        const { iata_code } = req.params;
        if (!iata_code || iata_code.length !== 3) {
            res.status(400).json({ error: "Invalid IATA code format" });
            return;
        }
        const airportRepository = DBconnector_1.AppDataSource.getRepository(Airport_1.Airport);
        const airport = await airportRepository.findOne({
            where: { iata_code },
            relations: ["city", "city.country"],
        });
        if (!airport) {
            res.status(404).json({ error: "Airport not found" });
            return;
        }
        res.json({ airport });
    }
    catch (error) {
        console.error("Error fetching airport data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getAirportInfo = getAirportInfo;
