import React, { useState, useEffect } from 'react';
import { Globe2 } from 'lucide-react';
import Rectangle from './components/Rectangle';
import CustomCursor from './components/CustomCursor';

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rectangles, setRectangles] = useState(['trust', 'rug', 'trust']);

  useEffect(() => {
    const shuffleArray = (array: string[]) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };
    setRectangles(shuffleArray(rectangles));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div className="min-h-screen bg-white" onMouseMove={handleMouseMove}>
      {/* <CustomCursor position={position} /> */}
      {/* Hero Section */}
      <header className="bg-gray-500 text-white h-screen flex flex-col">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Globe2 className="h-8 w-8" />
            <span className="text-xl font-bold">CompanyName</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-indigo-200">Features</a>
            <a href="#benefits" className="hover:text-indigo-200">Benefits</a>
            <a href="#testimonials" className="hover:text-indigo-200">Testimonials</a>
          </div>
          <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-indigo-50 transition-colors">
            Get Started
          </button>
        </nav>

        <div className="container mx-auto px-6 text-center flex-grow flex flex-row justify-center items-center">
          {rectangles.map((atr, index) => (
            <Rectangle key={index} atr={atr as 'rug' | 'trust'} position={position} />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;