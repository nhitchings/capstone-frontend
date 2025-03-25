import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Noise } from 'noisejs';
import './Scene.css';

function MovingMesh() {
    const meshRef = useRef();
    const noise = useMemo(() => new Noise(Math.random()), []);

    // Create a Plane BufferGeometry
    const geometry = useMemo(() => {
        const geom = new THREE.PlaneGeometry(10, 10, 100, 100);
        const positions = geom.attributes.position;

        // Apply initial displacement
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const z = noise.simplex2(x * 0.5, y * 0.5) * 0.5;
            positions.setZ(i, z);
        }

        positions.needsUpdate = true;
        return geom;
    }, [noise]);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            const time = clock.getElapsedTime();
            const positions = meshRef.current.geometry.attributes.position;

            for (let i = 0; i < positions.count; i++) {
                const x = positions.getX(i);
                const y = positions.getY(i);
                const z = noise.simplex2(x * 0.5 + time * 0.1, y * 0.5 + time * 0.1) * 0.5;
                positions.setZ(i, z);
            }

            positions.needsUpdate = true;
        }
    });

    return (
        <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="white" wireframe={true} />
        </mesh>
    );
}

export default function Scene({ width = '100vw', height = '100vh' }) {
    return (
        <div style={{ width, height }}>
            <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <MovingMesh />
            </Canvas>
        </div>
    );
}
