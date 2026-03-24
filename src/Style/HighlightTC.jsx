import React from "react";

const HighlightTC = (text) => {
  return text.split("T&C").map((part, index, arr) => (
    <span key={index}>
      {part}
      {index < arr.length - 1 && (
        <span className="text-blue-600 font-semibold cursor-pointer">T&C</span>
      )}
    </span>
  ));
};

export default HighlightTC;