import { createElement, useState, useCallback } from 'react';
import htm from 'htm';
import GameEngine from './game/GameEngine.js';
import MainMenu from './ui/MainMenu.js';
import SettingsMenu from './ui/SettingsMenu.js';
import HUD from './ui/HUD.js';

const html = htm.bind(createElement);

// Estado inicial del asentamiento
const INITIAL_GAME_STATE = {
    resources: { gold: 100, wood: 200, stone: 100, food: 50 },
    population: 5,
    popularity: 100,
    day: 1
};

export default function App() {
    const [view, setView] = useState('menu'); // 'menu', 'game', 'settings'
    const [settings, setSettings] = useState({ quality: 'high', audio: 50 });
    const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

    const handleStartGame = useCallback(() => {
        // Reset logic could go here
        setView('game');
    }, []);

    const handleExit = useCallback(() => {
        setView('menu');
    }, []);

    return html`
        <div className="relative w-full h-full bg-slate-900 text-slate-100 overflow-hidden select-none">
            
            <!-- Capa de Juego (3D) - Siempre montada pero pausada si no es view 'game' para persistencia (opcional) -->
            <!-- Por ahora desmontamos para ahorrar recursos en menú -->
            ${view === 'game' && html`
                <${GameEngine} settings=${settings} />
                <${HUD} 
                    state=${gameState} 
                    onExit=${handleExit} 
                />
            `}

            <!-- Capas de UI -->
            ${view === 'menu' && html`
                <${MainMenu} 
                    onStart=${handleStartGame} 
                    onSettings=${() => setView('settings')} 
                />
            `}

            ${view === 'settings' && html`
                <${SettingsMenu} 
                    currentSettings=${settings} 
                    onSave=${setSettings} 
                    onBack=${() => setView('menu')} 
                />
            `}
        </div>
    `;
}