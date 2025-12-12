import React, { useState, useEffect, useRef } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { PixelButton, BlinkingCursor } from './RetroUI';

const CyberChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{
      role: 'model',
      text: "HELLO ADVENTURER! I AM THE KEEPER OF THIS REALM. ASK ME ANYTHING.",
      timestamp: "00:00"
    }]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: "00:00"
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(input);

    const modelMsg: ChatMessage = {
      role: 'model',
      text: responseText,
      timestamp: "00:00"
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full font-pixel text-xs md:text-sm">
      <div className="bg-black border-2 border-gray-600 p-1 mb-2 text-center text-gray-400">
        --- COMM LINK ESTABLISHED ---
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[80%] p-3 border-2 
              ${msg.role === 'user' 
                ? 'bg-blue-900 border-blue-400 text-white rounded-tl-lg rounded-bl-lg rounded-tr-sm' 
                : 'bg-gray-800 border-gray-500 text-green-400 rounded-tr-lg rounded-br-lg rounded-tl-sm'
              }
            `}>
              <div className="font-bold mb-1 text-[10px] opacity-70">
                 {msg.role === 'user' ? 'PLAYER 1' : 'NPC KEEPER'}
              </div>
              <div>{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center text-gray-500 animate-pulse">
            Thinking...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="bg-blue-900 border-2 border-white p-2 flex gap-2">
        <span className="text-yellow-400 animate-float">▶</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-transparent text-white focus:outline-none font-pixel placeholder-blue-300"
          placeholder="Enter command..."
          disabled={isLoading}
        />
        {input && <BlinkingCursor />}
        <PixelButton onClick={handleSend} disabled={isLoading} className="py-1 px-2 text-[10px]">
          CAST
        </PixelButton>
      </div>
    </div>
  );
};

export default CyberChat;
