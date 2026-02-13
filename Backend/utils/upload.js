import multer from "multer";
import path from "path";


// Storage configuration
const storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, "uploads/");
},
filename: (req, file, cb) => {
const uniqueName = Date.now() + path.extname(file.originalname);
cb(null, uniqueName);
}
});


// File filter (only resumes allowed)
const fileFilter = (req, file, cb) => {
const allowedTypes = [
"application/pdf",
"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
"text/plain"
];


if (allowedTypes.includes(file.mimetype)) {
cb(null, true);
} else {
cb(new Error("Only PDF, DOCX, and TXT files are allowed"));
}
};


export const upload = multer({ storage, fileFilter });