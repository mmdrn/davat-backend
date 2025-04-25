import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import postRoutes from "./routes/postRoutes";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
