import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-md transition-all duration-500">
      <div className="relative">
        {/* Animated Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-teal-500/20 blur-2xl animate-pulse" />

        {/* Main Spinner */}
        <div className="relative flex flex-col items-center gap-6">
          <div className="relative">
            <Loader2
              className="w-16 h-16 text-teal-600 animate-spin"
              strokeWidth={1.5}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-teal-600 rounded-full" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl font-black tracking-widest bg-clip-text text-teal-600 uppercase">
              Planova
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600/40 animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600/40 animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600/40 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
