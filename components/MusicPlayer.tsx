import React, { useState, useEffect, useRef } from 'react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const schedulerTimerRef = useRef<number | null>(null);
  const nextNoteTimeRef = useRef(0);
  const noteIndexRef = useRef(0);

  // 16-bit RPG Town Theme Loop (Simulated)
  const melody = [
    // Simple looping arpeggio
    { note: 329.63, dur: 0.2 }, { note: 392.00, dur: 0.2 }, { note: 493.88, dur: 0.2 }, { note: 392.00, dur: 0.2 }, // E G B G
    { note: 329.63, dur: 0.2 }, { note: 392.00, dur: 0.2 }, { note: 493.88, dur: 0.2 }, { note: 587.33, dur: 0.2 }, // E G B D
    { note: 523.25, dur: 0.4 }, { note: 392.00, dur: 0.2 }, { note: 329.63, dur: 0.2 }, // C G E
  ];

  useEffect(() => {
    return () => stop();
  }, []);

  useEffect(() => {
    if (isPlaying) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      nextNoteTimeRef.current = audioCtxRef.current.currentTime + 0.1;
      scheduler();
    } else {
      if (schedulerTimerRef.current) window.clearTimeout(schedulerTimerRef.current);
    }
  }, [isPlaying]);

  const scheduler = () => {
    while (nextNoteTimeRef.current < (audioCtxRef.current?.currentTime || 0) + 0.1) {
      const beat = melody[noteIndexRef.current % melody.length];
      playNote(nextNoteTimeRef.current, beat.note, beat.dur);
      nextNoteTimeRef.current += beat.dur;
      noteIndexRef.current++;
    }
    schedulerTimerRef.current = window.setTimeout(scheduler, 25);
  };

  const playNote = (time: number, freq: number, duration: number) => {
    if (!audioCtxRef.current) return;
    
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    
    // Triangle wave for NES/SNES flute/bass feel
    osc.type = 'triangle';
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.1, time + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration - 0.05);

    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);

    osc.start(time);
    osc.stop(time + duration);
  };

  const stop = () => {
    setIsPlaying(false);
    if (schedulerTimerRef.current) window.clearTimeout(schedulerTimerRef.current);
  };

  return (
    <div className="bg-gray-800 border-2 border-gray-600 p-2 text-[10px] font-pixel text-gray-300">
      <div className="flex justify-between items-center mb-1">
        <span>SOUND TEST</span>
        <span className="text-pixel-gold">{isPlaying ? "01" : "00"}</span>
      </div>
      <div className="flex gap-2 justify-center">
         <button 
            onClick={() => setIsPlaying(true)} 
            className={`px-2 py-1 ${isPlaying ? 'text-white bg-green-700' : 'bg-black hover:bg-gray-700'}`}
         >
            ON
         </button>
         <button 
            onClick={stop}
            className={`px-2 py-1 ${!isPlaying ? 'text-white bg-red-700' : 'bg-black hover:bg-gray-700'}`}
         >
            OFF
         </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
