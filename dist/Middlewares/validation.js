"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateIATA = void 0;
const joi_1 = __importDefault(require("joi"));
const iataSchema = joi_1.default.object({
    iata_code: joi_1.default.string().length(3).required(),
});
const ValidateIATA = (req, res, next) => {
    const { iata_code } = req.params;
    const { error } = iataSchema.validate({ iata_code });
    if (error) {
        res.status(400).json({ error: "Invalid IATA code. Must be a 3-letters." });
        return;
    }
    next();
};
exports.ValidateIATA = ValidateIATA;
