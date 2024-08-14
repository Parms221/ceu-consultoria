// components/Alert.tsx
import React from 'react';

interface AlertProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
    >
      <div className="flex items-center">
        <span className="flex-1">{message}</span>
        <button onClick={onClose} className="ml-4 p-1 text-lg">&times;</button>
      </div>
    </div>
  );
};

export default Alert;
