import { createElement } from 'react';
import htm from 'htm';
import { Coins, Trees, Box, Utensils, Users, Pause } from 'lucide-react';

const html = htm.bind(createElement);

function ResourceDisplay({ icon, value, label }) {
    return html`
        <div className="flex flex-col items-center bg-stone-900/90 border border-stone-700 p-2 min-w-[70px] shadow-lg">
            <div className="text-yellow-500/80 mb-1">${icon}</div>
            <span className="text-white font-mono font-bold text-sm leading-none">${value}</span>
            <span className="text-[10px] text-stone-500 uppercase mt-1">${label}</span>
        </div>
    `;
}

export default function HUD({ state, onExit }) {
    return html`
        <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between z-40">
            
            <!-- Top Bar -->
            <div className="flex justify-between items-start">
                
                <!-- Resources -->
                <div className="flex gap-2 pointer-events-auto">
                    <${ResourceDisplay} icon=${html`<${Coins} size=${16} />`} value=${state.resources.gold} label="Oro" />
                    <${ResourceDisplay} icon=${html`<${Trees} size=${16} />`} value=${state.resources.wood} label="Madera" />
                    <${ResourceDisplay} icon=${html`<${Box} size=${16} />`} value=${state.resources.stone} label="Piedra" />
                    <${ResourceDisplay} icon=${html`<${Utensils} size=${16} />`} value=${state.resources.food} label="Comida" />
                    <div className="w-4"></div> <!-- Spacer -->
                    <${ResourceDisplay} icon=${html`<${Users} size=${16} />`} value=${state.population} label="Aldeanos" />
                </div>

                <!-- System Controls -->
                <button 
                    onClick=${onExit}
                    className="pointer-events-auto bg-red-900/80 hover:bg-red-800 text-white p-2 rounded border border-red-700 transition-colors shadow-lg"
                >
                    <${Pause} size=${20} fill="currentColor" />
                </button>
            </div>

            <!-- Bottom Bar (Build Menu Mockup) -->
            <div className="flex justify-center pointer-events-auto">
                <div className="bg-stone-900/95 border border-stone-600 px-6 py-3 rounded-t-lg shadow-2xl flex gap-4">
                    <span className="text-stone-500 text-xs font-serif italic self-center">Menú de Construcción (WIP)</span>
                </div>
            </div>

        </div>
    `;
}