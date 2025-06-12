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
    <div className="min-h-screen w-full" style={{ backgroundColor: '#E8A3D6' }} onMouseMove={handleMouseMove}>
      {/* <CustomCursor position={position} /> */}
      {/* Hero Section */}
      <header className="text-white flex flex-col">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/OWL.svg" alt="Owl Logo" className="h-16 w-16" />
            <span className="text-3xl font-bold">OWLERT</span>
          </div>
          <div className="flex space-x-8">
            <a
              href="https://x.com/owlerthl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity border border-white/20 bg-white/10 rounded-full shadow-lg flex items-center justify-center h-14 w-14 mx-2"
            >
              <img src="/X.svg" alt="X" className="h-8 w-8" />
            </a>
            <a
              href="https://t.me/owlertchat"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity border border-white/20 bg-white/10 rounded-full shadow-lg flex items-center justify-center h-14 w-14 mx-2"
            >
              <img src="/Telegram.svg" alt="Telegram" className="h-8 w-8" />
            </a>
          </div>
        </nav>
        <div className="flex flex-col items-center mt-8">
          <div
            className="backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg rounded-2xl px-6 py-2 mb-8 flex items-center justify-center cursor-pointer"
            style={{ minWidth: 260 }}
            onClick={handleCopy}
          >
            <span className="text-white font-semibold text-center select-all">
              {copied ? 'Copied!' : CONTRACT_ADDRESS}
            </span>
          </div>
          {/* Modern Slogan Card */}
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg rounded-2xl px-8 py-6 mb-16 max-w-2xl w-full flex flex-col items-center">
            <span className="text-base md:text-lg font-semibold text-white tracking-wide text-center drop-shadow-lg">
              This owl won't sleep — it will keep alerting you about profit opportunities and guarding you from rugs
            </span>
          </div>
          <div className="container mx-auto px-6 text-center flex-grow flex flex-row justify-center items-center">
            {rectangles.map((rect, index) => (
              <Rectangle key={index} atr={rect.atr as 'rug' | 'trust'} parentSvg={rect.parentSvg} position={position} />
            ))}
          </div>
        </div>
        {/* Modern Description Card - placed after the guys, before features */}
        <div className="backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg rounded-2xl px-8 py-6 mb-16 mt-12 max-w-2xl w-full flex flex-col items-center mx-auto">
          <span className="text-base md:text-lg font-semibold text-white tracking-wide text-center drop-shadow-lg">
            It's a bot designed to spot shady devs and help you protect yourself from rugs
          </span>
        </div>
        {/* Features Section */}
        <section className="w-full flex flex-col items-center py-16">
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg rounded-2xl px-4 py-4 max-w-2xl w-full flex flex-col items-center mx-auto text-base md:text-lg mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8 text-center drop-shadow-lg tracking-wide">Features you can use now for free:</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-white mb-0 w-full">
              <li className="flex items-start space-x-3"><span className="mt-2 w-2.5 h-2.5 bg-white rounded-full block aspect-square"></span><span>Check what tokens this dev created before</span></li>
              <li className="flex items-start space-x-3"><span className="mt-2 w-2.5 h-2.5 bg-white rounded-full block aspect-square"></span><span>Check whether this dev dumped their own supply, and if they were ever involved in a rug, you'll know right away</span></li>
              <li className="flex items-start space-x-3"><span className="mt-2 w-2.5 h-2.5 bg-white rounded-full block aspect-square"></span><span>Links to all the essential sources for research</span></li>
            </ul>
          </div>
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg rounded-2xl px-4 py-4 max-w-2xl w-full flex flex-col items-center mx-auto text-base md:text-lg">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 text-center drop-shadow-lg tracking-wide">Features coming soon:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-white w-full">
              <li className="flex items-start space-x-3"><span className="mt-2 w-2.5 h-2.5 bg-white rounded-full block aspect-square"></span><span>Token creation method where the token was launched from (directly through the LiquidLaunch platform or from other platforms / custom contracts). This will warn you about the possibility of the dev buying from external wallets</span></li>
              <li className="flex items-start space-x-3"><span className="mt-2 w-2.5 h-2.5 bg-white rounded-full block aspect-square"></span><span>Dev wallet tracking - we'll show where the dev got their tokens from (transferred from an exchange or another wallet). This will help you evaluate the dev's transparency and check if any of their other wallets are tied to scams</span></li>
            </ul>
          </div>
        </section>
      </header>
    </div>
  );
}

export default App;