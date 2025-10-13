// import React, { useState } from "react";
// import { processUrls } from "../api";

// const UrlInput = ({ onProcessed }) => {
//   const [urls, setUrls] = useState(["", "", ""]);
//   const [loading, setLoading] = useState(false);

//   const handleUrlChange = (index, value) => {
//     const updated = [...urls];
//     updated[index] = value;
//     setUrls(updated);
//   };

//   const handleProcess = async () => {
//     const validUrls = urls.filter((u) => u.trim());
//     if (!validUrls.length) return alert("Please enter at least one URL.");

//     setLoading(true);
//     try {
//       const res = await processUrls(validUrls);
//       console.log(res.data.message);
//       onProcessed();
//     } catch (err) {
//       console.error(err);
//       alert("Error processing URLs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       {urls.map((url, i) => (
//         <input
//           key={i}
//           type="text"
//           placeholder={`Enter URL ${i + 1}`}
//           value={url}
//           onChange={(e) => handleUrlChange(i, e.target.value)}
//           className="border border-gray-300 rounded p-2 w-full"
//         />
//       ))}
//       <button
//         onClick={handleProcess}
//         disabled={loading}
//         className={`px-4 py-2 rounded text-white font-semibold ${
//           loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
//         }`}
//       >
//         {loading ? "Processing..." : "Process URLs"}
//       </button>
//     </div>
//   );
// };

// export default UrlInput;


import React, { useState, useEffect } from "react";
import { processUrls } from "../api";

const UrlInput = ({ onProcessingStart, onProcessed, isReady, isProcessing, onReprocess }) => {
  const [urls, setUrls] = useState(() => JSON.parse(localStorage.getItem("urls")) || [""]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("urls", JSON.stringify(urls));
  }, [urls]);

  const handleUrlChange = (index, value) => {
    const updated = [...urls];
    updated[index] = value;
    setUrls(updated);
  };

  const handleAddUrl = () => setUrls([...urls, ""]);
  const handleRemoveUrl = (i) => setUrls(urls.filter((_, idx) => idx !== i));

  const handleProcess = async () => {
    const validUrls = urls.filter((u) => u.trim());
    if (!validUrls.length) return alert("Please enter at least one URL.");

    onProcessingStart();
    setLoading(true);
    try {
      await processUrls(validUrls);
      onProcessed();
    } catch (err) {
      console.error(err);
      alert("Error processing URLs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Article URLs</h2>

      {urls.map((url, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="text"
            placeholder={`Enter URL ${i + 1}`}
            value={url}
            onChange={(e) => handleUrlChange(i, e.target.value)}
            disabled={loading || isProcessing}
            className="flex-grow border border-gray-300 rounded p-2"
          />
          <button
            onClick={() => handleRemoveUrl(i)}
            disabled={loading || isProcessing}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      ))}

      <div className="flex gap-2">
        <button
          onClick={handleAddUrl}
          disabled={loading || isProcessing}
          className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          + Add URL
        </button>

        {!isReady ? (
          <button
            onClick={handleProcess}
            disabled={loading || isProcessing}
            className={`flex-1 text-white py-2 rounded font-semibold ${
              loading || isProcessing
                ? "bg-gray-400"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Processing..." : "Process URLs"}
          </button>
        ) : (
          <button
            onClick={onReprocess}
            className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
          >
            🔄 Reprocess
          </button>
        )}
      </div>
    </div>
  );
};

export default UrlInput;
