import NodeCache from "node-cache";
import dotenv from "dotenv";

dotenv.config();

const CACHE_TTL = Number(process.env.CACHE_TTL) || 600;

export const cache = new NodeCache({ stdTTL: CACHE_TTL });

export const getCachedData = (key: string) => cache.get(key);

export const setCachedData = (key: string, value: any) => cache.set(key, value);
