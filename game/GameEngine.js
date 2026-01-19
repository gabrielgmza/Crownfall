import { createElement, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { MapControls, Sky, Environment, BakeShadows, SoftShadows } from '@react-three/drei';
import htm from 'htm';
import * as THREE from 'three';

const html = htm.bind(createElement);

// --- ASSETS PROCEDURALES ---

function GrassTile({ position }) {
    // Variación aleatoria sutil
    const color = useMemo(() => {
        const colors = ['#4ade80', '#22c55e', '#16a34a']; // Tailwind green palette
        return colors[Math.floor(Math.random() * colors.length)];
    }, []);

    return html`
        <mesh position=${position} receiveShadow rotation=${[-Math.PI / 2, 0, 0]}>
            <planeGeometry args=${[1, 1]} />
            <meshStandardMaterial color=${color} roughness=${1} />
        </mesh>
    `;
}

function KeepModel({ position }) {
    return html`
        <group position=${position}>
            <!-- Base -->
            <mesh position=${[0, 1, 0]} castShadow receiveShadow>
                <boxGeometry args=${[3, 2, 3]} />
                <meshStandardMaterial color="#78716c" />
            </mesh>
            <!-- Torre -->
            <mesh position=${[1, 2.5, 1]} castShadow>
                <boxGeometry args=${[1, 2, 1]} />
                <meshStandardMaterial color="#57534e" />
            </mesh>
            <!-- Bandera -->
            <mesh position=${[1, 4, 1]}>
                <cylinderGeometry args=${[0.05, 0.05, 2]} />
                <meshStandardMaterial color="#444" />
            </mesh>
        </group>
    `;
}

function GameScene({ mapSize = 20 }) {
    // Generar suelo simple
    const tiles = useMemo(() => {
        const t = [];
        for (let x = -mapSize / 2; x < mapSize / 2; x++) {
            for (let z = -mapSize / 2; z < mapSize / 2; z++) {
                t.push({ x, z, id: `${x},${z}` });
            }
        }
        return t;
    }, [mapSize]);

    return html`
        <group>
            <!-- Luces Ambientales -->
            <ambientLight intensity=${0.5} />
            <directionalLight 
                position=${[50, 50, 25]} 
                intensity=${1.5} 
                castShadow 
                shadow-mapSize=${[1024, 1024]}
                shadow-bias=${-0.0001}
            />
            
            <!-- Cielo -->
            <${Sky} sunPosition=${[100, 20, 100]} />
            <${Environment} preset="park" />

            <!-- Mapa -->
            <group>
                ${tiles.map(tile => html`
                    <${GrassTile} key=${tile.id} position=${[tile.x, 0, tile.z]} />
                `)}
            </group>

            <!-- Estructuras Iniciales -->
            <${KeepModel} position=${[0, 0, 0]} />

            <!-- Controles RTS (MapControls bloquea rotación libre para estilo isométrico) -->
            <${MapControls} 
                enableDamping=${true} 
                dampingFactor=${0.05} 
                minDistance=${5} 
                maxDistance=${40} 
                maxPolarAngle=${Math.PI / 2.5}
            />
        </group>
    `;
}

export default function GameEngine({ settings }) {
    const shadows = settings.quality !== 'low';
    const dpr = settings.quality === 'high' ? [1, 2] : 1;

    return html`
        <div className="w-full h-full">
            <${Canvas} 
                shadows=${shadows} 
                dpr=${dpr}
                camera=${{ position: [15, 15, 15], fov: 40 }}
                gl=${{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
            >
                <${GameScene} />
                ${shadows && html`<${BakeShadows} />`}
            </${Canvas}>
        </div>
    `;
}