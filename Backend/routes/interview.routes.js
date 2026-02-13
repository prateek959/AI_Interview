import express from "express";
import { upload } from "../utils/upload.js";
import { uploadResume, submitAnswer } from "../controllers/interview.controller.js";


const router = express.Router();


router.post("/upload", upload.single("resume"), uploadResume);
router.post("/answer", submitAnswer);


export default router;