import { Request, Response } from "express";
import { AppDataSource } from "../Database/DBconnector";
import { Airport } from "../entities/Airport";
import { getCachedData, setCachedData } from "../utils/cache";
import { serverLogger, apiLogger, errorLogger } from "../utils/logger";

export const getAirportInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let { iata_code } = req.params;
    iata_code = iata_code.toUpperCase();

    // Check cache first
    const cachedData = getCachedData(iata_code);
    if (cachedData) {
      serverLogger.info(`Cache hit for ${iata_code}`);
      res.json(cachedData);
      return;
    }

    const airportRepository = AppDataSource.getRepository(Airport);
    const airport = await airportRepository.findOne({
      where: { iata_code },
      relations: ["city", "city.country"],
    });

    if (!airport) {
      apiLogger.warn(`Airport not found: ${iata_code}`);
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
    setCachedData(iata_code, response);

    apiLogger.info(`Airport data fetched for ${iata_code}`);
    res.json(response);
  } catch (error) {
    errorLogger.error(`Error fetching airport data: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
