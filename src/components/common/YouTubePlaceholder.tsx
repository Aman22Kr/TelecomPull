import React, { useState } from 'react';
import { Play, Video, Volume2, Maximize2, ShieldCheck, Sparkles } from 'lucide-react';

interface YouTubePlaceholderProps {
  title?: string;
  duration?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  caption?: string;
}

export const YouTubePlaceholder: React.FC<YouTubePlaceholderProps> = ({
  title = 'TelecomPull Official Device Tour & Unboxing',
  duration = '04:28',
  aspectRatio = '16:9',
  caption = 'HD Product Demonstration & First-Look Review'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full my-6">
      <div
        className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 shadow-2xl border border-slate-800 flex flex-col justify-between ${
          aspectRatio === '16:9' ? 'aspect-video' : 'aspect-square'
        }`}
      >
        {/* Top bar with video title & indicators */}
        <div className="p-4 sm:p-5 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white text-xs sm:text-sm font-semibold tracking-wide drop-shadow-sm line-clamp-1">
                {title}
              </p>
              <p className="text-slate-400 text-[11px] flex items-center gap-1.5">
                <span>TelecomPull Studio</span>
                <span>•</span>
                <span>4K Ultra HD</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
              VIDEO PLAYBACK PLACEHOLDER
            </span>
          </div>
        </div>

        {/* Center play state / blank placeholder area */}
        <div className="flex flex-col items-center justify-center text-center p-6 my-auto z-10">
          {!isPlaying ? (
            <div className="space-y-4">
              <button
                onClick={() => setIsPlaying(true)}
                className="group relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-sky-500 hover:bg-sky-400 text-white shadow-xl shadow-sky-500/40 transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Play Video Placeholder"
              >
                <div className="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-25 group-hover:opacity-40" />
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1 text-white" />
              </button>
              <div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">{caption}</p>
                <p className="text-[11px] text-slate-500 mt-1">Duration: {duration} • 60 FPS • Stereo Audio</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 max-w-md bg-black/60 backdrop-blur-md p-5 rounded-xl border border-sky-500/30">
              <div className="flex items-center justify-center gap-2 text-sky-400">
                <Sparkles className="w-5 h-5 animate-spin" />
                <span className="text-sm font-semibold text-white">Simulated High-Definition Playback</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                As per specification guidelines, YouTube video playback is reproduced as an accessible placeholder area with exact dimensions and 16:9 ratio.
              </p>
              <button
                onClick={() => setIsPlaying(false)}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium transition-colors"
              >
                Reset Player
              </button>
            </div>
          )}
        </div>

        {/* Bottom player controls bar */}
        <div className="p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center justify-between text-xs text-slate-400 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:text-sky-400 transition-colors"
            >
              <Play className="w-4 h-4 fill-current" />
            </button>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-slate-400" />
              <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-sky-500 rounded-full" />
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-300">
              {isPlaying ? '01:14' : '00:00'} / {duration}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex text-[11px] text-slate-400 items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              TelecomPull Verified Lab
            </span>
            <Maximize2 className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Ambient background grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      </div>
    </div>
  );
};
