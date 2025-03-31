import express from "express";
import { getAirportInfo } from "../Controllers/airportController";
import { ValidateIATA } from "../Middlewares/validation";

const router = express.Router();

router.get("/:iata_code", ValidateIATA, getAirportInfo);

export default router;
