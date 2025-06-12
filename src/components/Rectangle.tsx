import React, { useState, useRef, useEffect } from 'react';

interface RectangleProps {
  atr: 'rug' | 'trust';
  position: { x: number; y: number };
}

const Rectangle: React.FC<RectangleProps> = ({ atr, position }) => {
  const colorClass = atr === 'trust' ? 'bg-green-500' : 'bg-red-500';
  const containerRef = useRef<HTMLDivElement>(null);
  const [relativePosition, setRelativePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setRelativePosition({
        x: position.x - rect.left,
        y: position.y - rect.top,
      });
    }
  }, [position]);

  return (
    <div
      ref={containerRef}
      className="relative w-32 h-60 m-4 cursor-none"
      onMouseLeave={() => {
        setRelativePosition({ x: -100, y: -100 });
      }}
      data-atr={atr}
    >
      <div className="absolute inset-0 bg-blue-500"></div>
      <div
        className={`absolute inset-0 ${colorClass} flex items-center justify-center`}
        style={{
          maskImage: 'radial-gradient(circle 32px at center, black 100%, transparent 0)',
          WebkitMaskImage: 'radial-gradient(circle 32px at center, black 100%, transparent 0)',
          maskPosition: `${relativePosition.x - 32}px ${relativePosition.y - 32}px`,
          WebkitMaskPosition: `${relativePosition.x - 32}px ${relativePosition.y - 32}px`,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      >
        <span className="text-white text-2xl font-bold uppercase">
          {atr}
        </span>
      </div>
    </div>
  );
};

export default Rectangle; 