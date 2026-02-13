import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Interview_page = () => {
  const [question, setQuestion] = useState("Thinking...");
  const [answer, setAnswer] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [limitExceeded, setLimitExceeded] = useState(false);

  const location = useLocation();
  const resumeFile = location.state?.resume;

  useEffect(() => {
    if (!resumeFile) return;

    async function startInterview() {
      try {
        const formData = new FormData();
        formData.append("resume", resumeFile);

        const response = await axios.post(
          "http://localhost:3001/api/interview/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setQuestion(response.data.question);
        setResumeText(response.data.resumeText);
      } catch (err) {
        if (err.response?.status === 429) {
          setLimitExceeded(true);
          setQuestion("⚠️ Daily AI Interview Limit Exceeded");
        } else {
          setQuestion("Something went wrong. Please try again.");
        }
        console.log(err);
      }
    }

    startInterview();
  }, [resumeFile]);

  async function submitAnswer() {
    if (limitExceeded) return;
    if (!answer.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:3001/api/interview/answer",
        {
          resumeText,
          answer,
          lastQuestion: question,
        }
      );
      setQuestion(response.data.question);
      setAnswer("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

        {/* Header */}
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          AI Interview Session 🤖
        </h1>
        <p className="text-gray-300 text-center text-sm mb-8">
          Practice real interview questions and improve your confidence.
        </p>

        {/* Warning Message */}
        {limitExceeded && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl p-4 text-center">
            ⚠️ Your daily AI interview limit has been exceeded.  
            <br />
            Please try again after some time ⏳
          </div>
        )}

        {/* Question Box */}
        <div className="bg-black/40 border border-indigo-400/30 rounded-2xl p-6 mb-6">
          <p className="text-indigo-300 text-sm mb-2">Interview Question</p>
          <p className="text-white text-lg font-medium">
            {question}
          </p>
        </div>

        {/* Answer Input */}
        <div className="mb-6">
          <label className="block text-gray-300 text-sm mb-2">
            Your Answer
          </label>
          <input
            type="text"
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={limitExceeded}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={submitAnswer}
          disabled={limitExceeded}
          className={`w-full font-semibold py-3 rounded-xl transition
            ${limitExceeded
              ? "bg-gray-600 cursor-not-allowed text-gray-300"
              : "bg-indigo-600 hover:bg-indigo-500 text-white"
            }`}
        >
          {limitExceeded ? "Limit Reached 🚫" : "Submit Answer →"}
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          This AI interview helps you improve clarity, confidence, and technical skills.
        </p>
      </div>
    </div>
  );
};

export default Interview_page;
