import React from 'react';
import { Page } from '../types';
import MusicPlayer from './MusicPlayer';

interface NavigationProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, setPage }) => {
  const menuItems = [
    { id: Page.HOME, label: 'START GAME', icon: '🎮' },
    { id: Page.ABOUT, label: 'PLAYER STATS', icon: '👤' },
    { id: Page.PROJECTS, label: 'LEVEL SELECT', icon: '🗺️' },
    { id: Page.GUESTBOOK, label: 'SAVE POINT', icon: '💾' },
    { id: Page.LINKS, label: 'WARP ZONE', icon: '🌀' },
  ];

  return (
    <div className="h-full flex flex-col bg-black border-r-4 border-gray-600 p-4 font-pixel">
      <div className="text-center mb-6">
        <h1 className="text-pixel-gold text-lg animate-pulse">PAUSE</h1>
        <div className="text-xs text-gray-400 mt-2">SCORE: 009482</div>
      </div>

      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`
                w-full text-left p-3 text-xs md:text-sm flex items-center gap-3
                transition-all duration-200
                ${isActive 
                  ? 'bg-blue-800 text-white border-2 border-white translate-x-2' 
                  : 'text-gray-400 hover:text-white hover:translate-x-1'
                }
              `}
            >
              {isActive && <span className="animate-blink-fast">▶</span>}
              {!isActive && <span className="w-3"></span>}
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t-2 border-gray-700 space-y-4">
        <MusicPlayer />
        
        <div className="bg-gray-900 border border-gray-600 p-2 text-[10px] text-center">
            <div className="mb-1 text-gray-400">POWERED BY</div>
            <a href="https://www.carloscodes.com" target="_blank" rel="noopener noreferrer" className="block text-pixel-green hover:text-green-300 hover:underline">
               CARLOSCODES.COM
            </a>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
