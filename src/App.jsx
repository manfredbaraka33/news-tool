import React, { useState } from "react";
import UrlInput from "./components/UrlInput";
import QuestionBox from "./components/QuestionBox";

function App() {
  const [isReady, setIsReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcessingStart = () => {
    setIsProcessing(true);
    setIsReady(false);
  };

  const handleProcessed = () => {
    setIsProcessing(false);
    setIsReady(true);
  };

  const handleReprocess = () => {
    setIsReady(false);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        📰 ElopyBot – News Research Tool
      </h1>

      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-md space-y-6">
        <UrlInput
          onProcessingStart={handleProcessingStart}
          onProcessed={handleProcessed}
          isReady={isReady}
          isProcessing={isProcessing}
          onReprocess={handleReprocess}
        />

        {isProcessing ? (
          <p className="text-center text-yellow-600 font-medium animate-pulse">
            ⏳ Preparing URLs... Please wait
          </p>
        ) : isReady ? (
          <QuestionBox isReady={isReady} />
        ) : (
          <p className="text-center text-gray-500 italic">
            Enter your article URLs and click “Process URLs” to begin.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;

