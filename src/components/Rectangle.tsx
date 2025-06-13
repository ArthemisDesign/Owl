import React, { useRef, useEffect, useState } from 'react';

interface RectangleProps {
  atr: 'rug' | 'trust';
  parentSvg: string;
  position: { x: number; y: number };
  onRugHover?: (hovered: boolean) => void;
}

// Constants for the magnifying glass SVG
const GLASS_SVG_SIZE = 128; // px
const GLASS_CENTER_X = 64;  // px (center of glass in SVG)
const GLASS_CENTER_Y = 64;  // px (center of glass in SVG)
const MASK_RADIUS = 64;     // px (should match glass radius)

const Rectangle: React.FC<RectangleProps> = ({ atr, parentSvg, position, onRugHover }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [relativePosition, setRelativePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Offset the mask so it matches the glass center in the SVG
      setRelativePosition({
        x: position.x - rect.left + (GLASS_CENTER_X - GLASS_SVG_SIZE / 2),
        y: position.y - rect.top + (GLASS_CENTER_Y - GLASS_SVG_SIZE / 2),
      });
    }
  }, [position]);

  const childSvg = atr === 'trust' ? 'TRUST.svg' : 'RUG.svg';

  const handleMouseEnter = () => {
    if (atr === 'rug') {
      onRugHover?.(true);
    }
  };

  const handleMouseLeave = () => {
    setRelativePosition({ x: -100, y: -100 });
    if (atr === 'rug') {
      onRugHover?.(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-24 h-[15rem] md:w-64 md:h-[30rem] m-1 md:m-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          maskImage: `radial-gradient(circle ${MASK_RADIUS}px at ${relativePosition.x}px ${relativePosition.y}px, black 100%, transparent 0)`,
          WebkitMaskImage: `radial-gradient(circle ${MASK_RADIUS}px at ${relativePosition.x}px ${relativePosition.y}px, black 100%, transparent 0)`,
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