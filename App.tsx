import React, { useState } from 'react';
import { Page } from './types';
import Navigation from './components/Navigation';
import CyberChat from './components/CyberChat';
import { RpgPanel, PixelButton, StatBar, DividerSword } from './components/RetroUI';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>(Page.HOME);

  const renderContent = () => {
    switch (page) {
      case Page.HOME:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-fadeIn">
            <h1 className="text-4xl md:text-6xl text-yellow-400 drop-shadow-[4px_4px_0_#aa0000] leading-tight">
              CHARLES'<br/>WORLD
            </h1>
            <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-900 border-4 border-white rounded-full flex items-center justify-center overflow-hidden relative shadow-[0_0_20px_rgba(255,255,255,0.5)]">
               <img src="https://picsum.photos/200/200?grayscale" alt="Avatar" className="w-full h-full object-cover opacity-80" />
               <div className="absolute inset-0 bg-blue-500 mix-blend-overlay"></div>
            </div>
            
            <div className="space-y-4">
              <p className="text-white text-sm md:text-base animate-pulse">PRESS START TO BEGIN</p>
              <div className="flex gap-4 justify-center">
                 <PixelButton onClick={() => setPage(Page.ABOUT)}>NEW GAME</PixelButton>
                 <PixelButton onClick={() => setPage(Page.PROJECTS)}>LOAD GAME</PixelButton>
              </div>
            </div>

            <div className="mt-8 text-xs text-gray-400 bg-black/50 p-2 rounded">
              © 199X CHARLES CO. LTD.<br/>
              LICENSED BY NINTENDO OF AMERICA
            </div>
          </div>
        );
      case Page.ABOUT:
        return (
          <RpgPanel title="CHARACTER PROFILE" className="h-full">
             <div className="flex flex-col md:flex-row gap-8">
               <div className="shrink-0 flex flex-col items-center">
                 <div className="w-32 h-32 bg-gray-800 border-2 border-white mb-2 p-1">
                    <img src="https://picsum.photos/200/200?random=1" className="w-full h-full object-cover pixelated" />
                 </div>
                 <div className="text-center">
                   <div className="text-yellow-400 text-sm">LVL 28</div>
                   <div className="text-white text-xs">CLASS: DEV</div>
                 </div>
               </div>
               
               <div className="flex-1 space-y-4">
                 <div className="bg-black/40 p-4 rounded border border-blue-500">
                    <p className="mb-4 leading-relaxed text-sm">
                      Greetings! I am Charles. I craft digital experiences and battle bugs in the code dungeon.
                      My mission is to help small businesses level up their online presence.
                    </p>
                    <a href="https://www.carloscodes.com" target="_blank" className="text-green-400 hover:text-white underline text-xs">
                      [VIEW FULL QUEST LOG AT CARLOSCODES.COM]
                    </a>
                 </div>

                 <div>
                   <h3 className="text-yellow-400 text-sm mb-2 border-b border-gray-500 pb-1">STATS</h3>
                   <StatBar label="React.js" value={90} color="bg-green-500" />
                   <StatBar label="TypeScript" value={85} color="bg-blue-500" />
                   <StatBar label="Tailwind" value={80} color="bg-red-500" />
                   <StatBar label="Pixel Art" value={45} color="bg-purple-500" />
                 </div>
               </div>
             </div>
          </RpgPanel>
        );
      case Page.PROJECTS:
        return (
          <div className="space-y-6 h-full flex flex-col">
            <h2 className="text-2xl text-center text-white drop-shadow-[2px_2px_0_#000]">LEVEL SELECT</h2>
            <div className="grid grid-cols-1 gap-4 overflow-y-auto pr-2">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="group relative">
                   <div className="absolute inset-0 bg-blue-600 translate-y-2 translate-x-2 rounded-lg"></div>
                   <div className="relative bg-gray-800 border-2 border-white p-4 rounded-lg hover:translate-y-1 hover:translate-x-1 transition-transform cursor-pointer">
                     <div className="flex items-start justify-between mb-2">
                       <h3 className="text-yellow-400 text-sm">WORLD 1-{i}: INVENTORY APP</h3>
                       <span className="text-xs text-gray-500">High Score: {i * 5000}</span>
                     </div>
                     <p className="text-xs text-gray-300 mb-3">
                       A robust tool for local merchants. Features real-time tracking and database integration.
                     </p>
                     <div className="flex gap-2">
                       <span className="bg-blue-900 text-blue-200 px-1 text-[10px] border border-blue-500">React</span>
                       <span className="bg-green-900 text-green-200 px-1 text-[10px] border border-green-500">Node</span>
                     </div>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        );
      case Page.GUESTBOOK:
        return (
          <RpgPanel title="SAVE POINT / COMMS" className="h-full flex flex-col">
             <div className="mb-4 text-center text-xs text-blue-200">
               Interact with the Keeper AI to leave a message.
             </div>
             <div className="flex-1 min-h-0 border-2 border-gray-600 bg-black p-1">
               <CyberChat />
             </div>
          </RpgPanel>
        );
      case Page.LINKS:
        return (
          <RpgPanel title="WARP ZONES" className="h-full text-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <a href="https://www.carloscodes.com" target="_blank" className="block p-8 border-4 border-dashed border-gray-500 hover:border-white hover:bg-gray-700 transition-colors group">
                <div className="text-4xl mb-4 group-hover:animate-bounce">🌀</div>
                <div className="text-green-400 mb-2">WARP TO CARLOSCODES.COM</div>
                <div className="text-[10px] text-gray-400">DANGER LEVEL: LOW</div>
              </a>
              
              <div className="opacity-50 cursor-not-allowed p-8 border-4 border-dashed border-gray-700">
                <div className="text-4xl mb-4">🔒</div>
                <div className="text-gray-500">LOCKED ZONE</div>
                <div className="text-[10px] text-gray-600">REQ: LVL 99</div>
              </div>
            </div>
            
            <div className="mt-12">
              <DividerSword />
              <p className="text-xs text-gray-400 mt-4">"It's dangerous to go alone! Take this link."</p>
            </div>
          </RpgPanel>
        );
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row max-w-6xl mx-auto p-2 md:p-8 gap-4">
      {/* Side Menu (Pause Screen) */}
      <div className="w-full md:w-64 shrink-0 h-48 md:h-full border-4 border-white shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] z-10">
        <Navigation currentPage={page} setPage={setPage} />
      </div>

      {/* Main Game Screen */}
      <div className="flex-1 relative border-4 border-white bg-black/80 shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] overflow-hidden">
        {/* CRT Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20"></div>
        
        <main className="h-full p-4 md:p-8 overflow-hidden relative z-10">
           {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
