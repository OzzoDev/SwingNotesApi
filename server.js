import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import "./config/db.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => res.send("Swing note api"));

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
