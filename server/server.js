import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weatherRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/weather", weatherRoutes);

export default app;