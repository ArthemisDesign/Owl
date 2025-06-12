import React from 'react';

interface CustomCursorProps {
  position: { x: number; y: number };
}

const CustomCursor: React.FC<CustomCursorProps> = ({ position }) => {
  return (
    <img
      src="/GLASS1.svg"
      alt="Magnifying Glass"
      className="fixed pointer-events-none z-50"
      style={{
        width: 128,
        height: 128,
        left: position.x - 64,
        top: position.y - 64,
        position: 'fixed',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
      draggable={false}
    />
  );
};

export default CustomCursor; 