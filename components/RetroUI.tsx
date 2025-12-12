import React from 'react';

// RPG Text Box Container
// Gradient blue background with a white pixel border
export const RpgPanel: React.FC<{ children: React.ReactNode; title?: string, className?: string }> = ({ children, title, className = "" }) => (
  <div className={`
    relative
    bg-gradient-to-b from-snes-blue-dark to-snes-blue-light
    border-4 border-white rounded-lg
    shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]
    text-white font-pixel
    ${className}
  `}>
    {/* Decorative corners could be added here with absolute positioning */}
    {title && (
      <div className="absolute -top-4 left-4 bg-black px-2 border-2 border-white text-pixel-gold text-xs tracking-widest uppercase">
        {title}
      </div>
    )}
    <div className="p-4 md:p-6 h-full overflow-auto">
      {children}
    </div>
  </div>
);

// 16-Bit Button
export const PixelButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button
    className={`
      bg-gray-700 text-white font-pixel text-xs px-4 py-3
      border-2 border-gray-400
      shadow-[inset_-2px_-2px_0px_rgba(0,0,0,0.5),inset_2px_2px_0px_rgba(255,255,255,0.2)]
      hover:bg-gray-600 hover:text-pixel-gold hover:border-pixel-gold
      active:translate-y-1 active:shadow-none
      transition-all
      uppercase tracking-wider
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

// Health/Stat Bar
export const StatBar: React.FC<{ label: string; value: number; color?: string }> = ({ label, value, color = "bg-green-500" }) => (
  <div className="flex items-center gap-2 mb-2 font-pixel text-xs">
    <div className="w-24 text-right text-gray-300">{label}</div>
    <div className="flex-1 bg-black border-2 border-gray-500 h-6 p-0.5">
      <div className={`h-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${value}%` }}></div>
    </div>
    <div className="w-8 text-right text-yellow-200">{value}</div>
  </div>
);

export const BlinkingCursor = () => (
  <span className="inline-block w-3 h-4 bg-white animate-blink-fast ml-1 align-middle" />
);

export const DividerSword = () => (
  <div className="flex items-center gap-2 opacity-50 my-4">
    <div className="h-0.5 flex-1 bg-white"></div>
    <span className="text-xl">⚔️</span>
    <div className="h-0.5 flex-1 bg-white"></div>
  </div>
);
