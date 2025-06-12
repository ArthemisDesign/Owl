import React, { useState, useEffect } from 'react';
import { Globe2 } from 'lucide-react';
import Rectangle from './components/Rectangle';
import CustomCursor from './components/CustomCursor';

const GUY_SVGS = ['GUY1.svg', 'GUY2.svg', 'GUY3.svg', 'GUY4.svg', 'GUY5.svg'];
const CONTRACT_ADDRESS = '0x1234...abcd';

function getRandomGuySvg() {
  return GUY_SVGS[Math.floor(Math.random() * GUY_SVGS.length)];
}

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rectangles, setRectangles] = useState([
    { atr: 'trust', parentSvg: '' },
    { atr: 'rug', parentSvg: '' },
    { atr: 'trust', parentSvg: '' },
    { atr: 'trust', parentSvg: '' },
  ]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Assign a random GUY svg to each rectangle
    const withSvgs = rectangles.map(rect => ({ ...rect, parentSvg: getRandomGuySvg() }));
    // Shuffle the array
    const shuffleArray = (array) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };
    setRectangles(shuffleArray(withSvgs));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="min-h-screen bg-white" onMouseMove={handleMouseMove}>
      {/* <CustomCursor position={position} /> */}
      {/* Hero Section */}
      <header className="bg-gray-500 text-white h-screen flex flex-col">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/OWL.svg" alt="Owl Logo" className="h-16 w-16" />
            <span className="text-3xl font-bold">OWLERT</span>
          </div>
          <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-indigo-50 transition-colors">
            Get Started
          </button>
        </nav>
        <div className="flex flex-col items-center mt-8">
          <button
            className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-indigo-50 transition-colors mb-24 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            style={{ minWidth: 260 }}
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : CONTRACT_ADDRESS}
          </button>
          <div className="container mx-auto px-6 text-center flex-grow flex flex-row justify-center items-center">
            {rectangles.map((rect, index) => (
              <Rectangle key={index} atr={rect.atr as 'rug' | 'trust'} parentSvg={rect.parentSvg} position={position} />
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;