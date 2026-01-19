import { createElement, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { MapControls, Sky, Environment, BakeShadows } from '@react-three/drei';
import htm from 'htm';
import * as THREE from 'three';

const html = htm.bind(createElement);

// --- COMPONENTES DEL MUNDO ---

function GroundPlane({ size = 100 }) {
    return html`
        <mesh rotation=${[-Math.PI / 2, 0, 0]} receiveShadow position=${[0, -0.01, 0]}>
            <planeGeometry args=${[size, size]} />
            <meshStandardMaterial color="#4d7c0f" roughness=${1} />
        </mesh>
    `;
}

function Keep({ position }) {
    return html`
        <group position=${position}>
            <!-- Base Fuerte -->
            <mesh position=${[0, 1.5, 0]} castShadow receiveShadow>
                <boxGeometry args=${[4, 3, 4]} />
                <meshStandardMaterial color="#57534e" roughness=${0.8} />
            </mesh>
            <!-- Almenas -->
            <mesh position=${[1.5, 3.25, 1.5]} castShadow>
                <boxGeometry args=${[0.8, 0.5, 0.8]} />
                <meshStandardMaterial color="#44403c" />
            </mesh>
            <mesh position=${[-1.5, 3.25, 1.5]} castShadow>
                <boxGeometry args=${[0.8, 0.5, 0.8]} />
                <meshStandardMaterial color="#44403c" />
            </mesh>
            <mesh position=${[1.5, 3.25, -1.5]} castShadow>
                <boxGeometry args=${[0.8, 0.5, 0.8]} />
                <meshStandardMaterial color="#44403c" />
            </mesh>
            <mesh position=${[-1.5, 3.25, -1.5]} castShadow>
                <boxGeometry args=${[0.8, 0.5, 0.8]} />
                <meshStandardMaterial color="#44403c" />
            </mesh>
            <!-- Bandera Central -->
            <mesh position=${[0, 4.5, 0]} castShadow>
                <cylinderGeometry args=${[0.1, 0.1, 3]} />
                <meshStandardMaterial color="#78350f" />
            </mesh>
            <mesh position=${[0.5, 5.5, 0]} rotation=${[0, 0, -0.2]}>
                <boxGeometry args=${[1, 0.6, 0.05]} />
                <meshStandardMaterial color="#dc2626" />
            </mesh>
        </group>
    `;
}

function GameScene() {
    return html`
        <group>
            <!-- Iluminación Global -->
            <ambientLight intensity=${0.6} />
            <directionalLight 
                position=${[20, 30, 10]} 
                intensity=${1.5} 
                castShadow 
                shadow-mapSize=${[2048, 2048]}
                shadow-bias=${-0.0005}
            >
                <orthographicCamera attach="shadow-camera" args=${[-30, 30, 30, -30]} />
            </directionalLight>

            <${Sky} sunPosition=${[100, 20, 100]} turbidity=${8} rayleigh=${6} />
            <${Environment} preset="park" />

            <!-- Terreno y Estructuras -->
            <${GroundPlane} />
            <${Keep} position=${[0, 0, 0]} />

            <!-- Controles RTS (Estilo Stronghold) -->
            <${MapControls} 
                screenSpacePanning=${false}
                minDistance=${10}
                maxDistance=${60}
                maxPolarAngle=${Math.PI / 2.2}
                dampingFactor=${0.05}
            />
        </group>
    `;
}

export default function GameEngine({ settings }) {
    const shadows = settings.quality !== 'low';
    
    return html`
        <div className="w-full h-full bg-black">
            <${Canvas} 
                shadows=${shadows}
                camera=${{ position: [20, 20, 20], fov: 40 }}
                gl=${{ 
                    antialias: true, 
                    toneMapping: THREE.ACESFilmicToneMapping,
                    outputColorSpace: THREE.SRGBColorSpace
                }}
            >
                <${GameScene} />
                ${shadows && html`<${BakeShadows} />`}
            </${Canvas}>
        </div>
    `;
}