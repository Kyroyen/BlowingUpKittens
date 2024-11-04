import React, { useEffect } from 'react';

const Toast = ({ id, message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id); // Call onClose with the toast ID to remove it from the list
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div className="w-auto flex bg-green-500 text-white px-4 py-2 rounded shadow-lg mb-2">
      {message}
    </div>
  );
};

export default Toast;
