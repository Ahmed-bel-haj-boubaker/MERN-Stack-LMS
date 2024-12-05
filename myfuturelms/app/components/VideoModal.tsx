import React from "react";

interface VideoModalProps {
  videoUrl: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-4xl p-6">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="w-full">
          <video
            controls
            className="rounded-lg w-full"
            src={videoUrl}
            autoPlay
          />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
