import { createElement } from 'react';
import htm from 'htm';
import { Castle, Settings, Play, LogOut } from 'lucide-react';

const html = htm.bind(createElement);

export default function MainMenu({ onStart, onSettings }) {
    return html`
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950 z-50 bg-[url('https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=2560&auto=format&fit=crop')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            
            <div className="relative z-10 flex flex-col items-center animate-in fade-in duration-700">
                <div className="mb-12 text-center">
                    <div className="flex justify-center mb-4 text-yellow-500">
                        <${Castle} size=${80} strokeWidth=${1.5} />
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-700 drop-shadow-lg tracking-tighter">
                        CROWNFALL
                    </h1>
                    <p className="text-stone-400 tracking-[0.5em] text-sm md:text-base mt-2 uppercase font-semibold">
                        Reino de Altaforja
                    </p>
                </div>

                <div className="flex flex-col gap-4 w-72">
                    <button 
                        onClick=${onStart}
                        className="group relative px-8 py-4 bg-stone-900/80 border border-stone-600 hover:border-yellow-500 hover:bg-stone-800 text-stone-200 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-yellow-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <${Play} size=${20} />
                        <span className="font-serif font-bold text-lg tracking-wide relative z-10">JUGAR</span>
                    </button>

                    <button 
                        onClick=${onSettings}
                        className="group px-8 py-3 bg-stone-900/60 border border-stone-700 hover:bg-stone-800 hover:border-stone-500 text-stone-400 hover:text-stone-200 transition-all flex items-center justify-center gap-3"
                    >
                        <${Settings} size=${18} />
                        <span className="font-serif font-semibold tracking-wide">OPCIONES</span>
                    </button>

                    <button 
                        className="px-8 py-3 bg-transparent border border-transparent hover:bg-red-900/20 hover:text-red-400 text-stone-600 transition-all flex items-center justify-center gap-3"
                    >
                        <${LogOut} size=${18} />
                        <span className="font-serif font-semibold text-sm">SALIR</span>
                    </button>
                </div>
            </div>

            <div className="absolute bottom-6 text-stone-600 text-xs font-mono">
                v2.0.0 Stable • Engine: Three.js r160
            </div>
        </div>
    `;
}