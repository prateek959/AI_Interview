import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import interviewRoutes from "./routes/interview.routes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin:"*",
    credentials:true
}));

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "server running",
    time: new Date()
  });
});

app.use("/api/interview", interviewRoutes);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});