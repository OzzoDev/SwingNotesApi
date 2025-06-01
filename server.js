import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import "./config/db.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.js";
import ApiRouter from "./routes/ApiRouter.js";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (_, res) => {
  res.redirect("/docs");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", ApiRouter);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
