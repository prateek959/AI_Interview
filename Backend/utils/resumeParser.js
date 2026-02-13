import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";


export const extractText = async (filePath, mimeType) => {
    try {
        if (mimeType === "application/pdf") {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdfParse(dataBuffer);
            return data.text;
        }


        if (mimeType.includes("wordprocessingml")) {
            const result = await mammoth.extractRawText({ path: filePath });
            return result.value;
        }


        if (mimeType === "text/plain") {
            return fs.readFileSync(filePath, "utf-8");
        }


        throw new Error("Unsupported file type");
    } catch (error) {
console.log(error);
    }

};