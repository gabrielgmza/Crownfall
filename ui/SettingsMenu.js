import { createElement } from 'react';
import htm from 'htm';
import { ArrowLeft, Volume2, Monitor } from 'lucide-react';

const html = htm.bind(createElement);

export default function SettingsMenu({ currentSettings, onSave, onBack }) {
    const handleChange = (key, value) => {
        onSave({ ...currentSettings, [key]: value });
    };

    return html`
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50">
            <div className="w-full max-w-md bg-stone-900 border border-stone-700 p-8 shadow-2xl relative">
                
                <h2 className="text-3xl font-serif text-yellow-500 mb-8 border-b border-stone-800 pb-4">
                    Configuración
                </h2>

                <div className="space-y-8">
                    <!-- Graphics -->
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-stone-300 mb-2">
                            <${Monitor} size=${20} />
                            <span className="font-bold tracking-wide">CALIDAD GRÁFICA</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            ${['low', 'medium', 'high'].map(q => html`
                                <button 
                                    key=${q}
                                    onClick=${() => handleChange('quality', q)}
                                    className=${`
                                        py-2 px-4 border text-sm font-semibold uppercase transition-colors
                                        ${currentSettings.quality === q 
                                            ? 'bg-yellow-700/20 border-yellow-600 text-yellow-500' 
                                            : 'bg-stone-950 border-stone-800 text-stone-500 hover:border-stone-600'}
                                    `}
                                >
                                    ${q}
                                </button>
                            `)}
                        </div>
                    </div>

                    <!-- Audio -->
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-stone-300 mb-2">
                            <${Volume2} size=${20} />
                            <span className="font-bold tracking-wide">VOLUMEN MAESTRO</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" max="100" 
                            value=${currentSettings.audio}
                            onChange=${(e) => handleChange('audio', parseInt(e.target.value))}
                            className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-yellow-600"
                        />
                        <div className="text-right text-stone-500 text-xs font-mono">
                            ${currentSettings.audio}%
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-stone-800 flex justify-between items-center">
                    <button 
                        onClick=${onBack}
                        className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors"
                    >
                        <${ArrowLeft} size=${20} />
                        <span>VOLVER</span>
                    </button>
                    
                    <span className="text-xs text-green-900 bg-green-900/20 px-2 py-1 rounded border border-green-900/30">
                        Cambios guardados
                    </span>
                </div>

            </div>
        </div>
    `;
}