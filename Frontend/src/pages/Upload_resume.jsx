import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Upload_resume = () => {
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  function getFile(e) {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFileName(selectedFile.name);

    navigate("/ai-interview", {
      state: { resume: selectedFile },
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-md text-center border border-white/20">
        
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-white mb-3">
          AI Interview Room
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 mb-6 text-sm">
          Step into a real interview environment powered by Artificial Intelligence
        </p>

        {/* Highlight Box */}
        <div className="bg-white/10 text-gray-200 text-sm rounded-xl p-4 mb-7">
          💡 Improve your technical knowledge, confidence,  
          and communication skills with instant AI feedback.
        </div>

        {/* Upload Area */}
        <label className="cursor-pointer block">
          <div className="border-2 border-dashed border-indigo-400 rounded-2xl p-7 hover:border-indigo-300 hover:bg-white/5 transition">
            <p className="text-indigo-300 font-semibold text-lg">
              Upload Your Resume
            </p>
            <p className="text-gray-400 text-xs mt-1">
              PDF • DOCX • TXT
            </p>

            {fileName && (
              <p className="text-green-400 mt-4 text-sm font-medium">
                ✔ {fileName}
              </p>
            )}
          </div>

          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={getFile}
            className="hidden"
          />
        </label>

        {/* Footer */}
        <p className="text-gray-500 text-xs mt-8">
          Your resume is securely used only to generate interview questions.
        </p>
      </div>
    </div>
  );
};

export default Upload_resume;
