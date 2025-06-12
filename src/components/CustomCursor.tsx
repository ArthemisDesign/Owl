import React from 'react';

interface CustomCursorProps {
  position: { x: number; y: number };
}

const CustomCursor: React.FC<CustomCursorProps> = ({ position }) => {
  return (
    <div
      className="fixed w-16 h-16 rounded-full bg-white/50 pointer-events-none z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    ></div>
  );
};

export default CustomCursor; 