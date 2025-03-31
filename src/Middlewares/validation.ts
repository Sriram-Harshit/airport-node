import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const iataSchema = Joi.object({
  iata_code: Joi.string().length(3).required(),
});

export const ValidateIATA = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { iata_code } = req.params;
  const { error } = iataSchema.validate({ iata_code });

  if (error) {
    res.status(400).json({ error: "Invalid IATA code. Must be a 3-letters." });
    return;
  }
  next();
};
