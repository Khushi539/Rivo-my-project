import React, { useRef } from "react";
import { Uploader, Button } from "rsuite";

const ImageUpload = ({ value, onUpload }) => {
  const uploaderRef = useRef(null);

  return (
    <div className="flex items-center gap-6 mb-6">
      {/* Preview */}
      <img
        src={value || "https://via.placeholder.com/150"}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover"
      />

      {/* Hidden uploader */}
      <Uploader
        ref={uploaderRef}
        accept="image/*"
        fileListVisible={false}
        shouldUpload={false}   // 🔥 IMPORTANT
        onChange={(fileList) => {
          if (fileList.length > 0) {
            const file = fileList[fileList.length - 1];
            const previewUrl = URL.createObjectURL(file.blobFile);

            onUpload(previewUrl);
          }
        }}
      >
        <></>
      </Uploader>

      {/* Button */}
      <Button
        appearance="ghost"
        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
        onClick={() => uploaderRef.current.open()}
      >
        Change Photo
      </Button>
    </div>
  );
};

export default ImageUpload;