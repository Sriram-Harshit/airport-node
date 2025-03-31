"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const DBconnector_1 = require("./Database/DBconnector");
const airport_1 = __importDefault(require("./Routes/airport"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", airport_1.default);
const PORT = process.env.PORT || 5000;
DBconnector_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((error) => console.log("Error connecting to database:", error));
