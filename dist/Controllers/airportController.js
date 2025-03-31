"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAirportInfo = void 0;
const DBconnector_1 = require("../Database/DBconnector");
const Airport_1 = require("../entities/Airport");
const cache_1 = require("../utils/cache");
const logger_1 = require("../utils/logger");
const getAirportInfo = async (req, res) => {
    try {
        let { iata_code } = req.params;
        iata_code = iata_code.toUpperCase();
        // Check cache first
        const cachedData = (0, cache_1.getCachedData)(iata_code);
        if (cachedData) {
            logger_1.serverLogger.info(`Cache hit for ${iata_code}`);
            res.json(cachedData);
            return;
        }
        const airportRepository = DBconnector_1.AppDataSource.getRepository(Airport_1.Airport);
        const airport = await airportRepository.findOne({
            where: { iata_code },
            relations: ["city", "city.country"],
        });
        if (!airport) {
            logger_1.apiLogger.warn(`Airport not found: ${iata_code}`);
            res.status(404).json({ error: "Airport not found" });
            return;
        }
        const city = airport.city
            ? {
                id: airport.city.id,
                name: airport.city.name,
                country_id: airport.city.country?.id || null,
                is_active: airport.city.is_active,
                lat: airport.city.lat,
                long: airport.city.long,
            }
            : null;
        const country = airport.city?.country
            ? {
                id: airport.city.country.id,
                name: airport.city.country.name.trim(),
                country_code_two: airport.city.country.country_code_two.trim(),
                country_code_three: airport.city.country.country_code_three.trim(),
                mobile_code: airport.city.country.mobile_code,
                continent_id: airport.city.country.continent_id,
            }
            : null;
        const response = {
            airport: {
                id: airport.id,
                icao_code: airport.icao_code,
                iata_code: airport.iata_code,
                name: airport.name,
                type: airport.type,
                latitude_deg: airport.latitude_deg,
                longitude_deg: airport.longitude_deg,
                elevation_ft: airport.elevation_ft,
                address: { city, country },
            },
        };
        // Cache the response
        (0, cache_1.setCachedData)(iata_code, response);
        logger_1.apiLogger.info(`Airport data fetched for ${iata_code}`);
        res.json(response);
    }
    catch (error) {
        logger_1.errorLogger.error(`Error fetching airport data: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getAirportInfo = getAirportInfo;
