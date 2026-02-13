import { extractText } from "../utils/resumeParser.js";
import { generateInterviewQuestion } from "../services/gemini.service.js";
import fs from "fs";


let interviewMemory = [];


export const uploadResume = async (req, res) => {
try {
const file = req.file;


if (!file) {
return res.status(400).json({ message: "Resume file is required" });
}


const resumeText = await extractText(file.path, file.mimetype);


// fs.unlinkSync(file.path);
if (fs.existsSync(file.path)) {
  fs.unlinkSync(file.path);
}



interviewMemory = [];


const firstQuestion = await generateInterviewQuestion(resumeText);
if(!firstQuestion){
    return res.status(429).json({message:"You Exceed your daily limit"});
}


res.status(200).json({
message: "Interview started",
question: firstQuestion,
resumeText
});


} catch (error) {
    console.log(error)
res.status(500).json({ error: error.message, msg:"Line44" });
}
};


export const submitAnswer = async (req, res) => {
try {
const { resumeText, answer, lastQuestion } = req.body;


interviewMemory.push({
question: lastQuestion,
answer
});


const nextQuestion = await generateInterviewQuestion(
resumeText,
interviewMemory
);

res.status(200).json({ question: nextQuestion });


} catch (error) {
    console.log(error)
res.status(500).json({ error: error.message, msg:"line71" });
}
};