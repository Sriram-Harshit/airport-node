"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCachedData = exports.getCachedData = exports.cache = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CACHE_TTL = Number(process.env.CACHE_TTL) || 600;
exports.cache = new node_cache_1.default({ stdTTL: CACHE_TTL });
const getCachedData = (key) => exports.cache.get(key);
exports.getCachedData = getCachedData;
const setCachedData = (key, value) => exports.cache.set(key, value);
exports.setCachedData = setCachedData;
