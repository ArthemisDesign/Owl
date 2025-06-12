import React, { useRef, useEffect, useState } from 'react';

interface RectangleProps {
  atr: 'rug' | 'trust';
  parentSvg: string;
  position: { x: number; y: number };
}

const Rectangle: React.FC<RectangleProps> = ({ atr, parentSvg, position }) => {
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

  const childSvg = atr === 'trust' ? 'TRUST.svg' : 'RUG.svg';

  return (
    <div
      ref={containerRef}
      className="relative w-64 h-[30rem] m-4 cursor-none"
      onMouseLeave={() => {
        setRelativePosition({ x: -100, y: -100 });
      }}
      data-atr={atr}
    >
      {/* Parent SVG */}
      <img
        src={`/${parentSvg}`}
        alt="parent"
        className="absolute inset-0 w-full h-full object-contain"
        draggable={false}
      />
      {/* Child SVG revealed by mask */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          maskImage: 'radial-gradient(circle 64px at center, black 100%, transparent 0)',
          WebkitMaskImage: 'radial-gradient(circle 64px at center, black 100%, transparent 0)',
          maskPosition: `${relativePosition.x - 64}px ${relativePosition.y - 64}px`,
          WebkitMaskPosition: `${relativePosition.x - 64}px ${relativePosition.y - 64}px`,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      >
        <img
          src={`/${childSvg}`}
          alt={atr}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default Rectangle; 