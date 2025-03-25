import * as THREE from 'three';
import { Canvas, useFrame, extend, useLoader, useThree } from '@react-three/fiber';
import { useRef, useMemo, useState } from 'react';
import { TextureLoader } from 'three';
import { shaderMaterial, Points, PointMaterial } from '@react-three/drei';

// Load normal map texture
const normalMapURL = './wave-normal-map.jpg';

const WaveShaderMaterial = shaderMaterial(
    {
        time: 0,
        normalMap: null,
        color1: new THREE.Color(0x1e3a8a),
        color2: new THREE.Color(0x3b82f6),
        lightPosition: new THREE.Vector3(5, 5, 5),
        waveHeight: 0.0,
        glowColor: new THREE.Color(0x000000),
        glowCenter: new THREE.Vector2(0.5, 0.5),
        waveCenters: new Array(10).fill().map(() => new THREE.Vector2(-1, -1)),
    },
    `
    varying vec2 vUv;
    uniform float time;
    uniform float waveHeight;
    const int MAX_WAVES = 10;
    uniform vec2 waveCenters[MAX_WAVES];

    void main() {
        vUv = uv;
        vec3 pos = position;
        float totalWave = 0.0;
        for (int i = 0; i < MAX_WAVES; i++) {
            vec2 center = waveCenters[i];
            float d = distance(vUv, center);
            float age = mod(time - float(i), 100.0); // simulate time since click
            float attenuation = max(0.0, 1.0 - age * 0.1); // fade over time
            float wave = sin(d * 30.0 - time * 4.0) * exp(-d * 10.0) * attenuation;
            totalWave += wave;
        }
        pos.z += totalWave * waveHeight;

        float rippleRing = 0.0;
        for (int i = 0; i < MAX_WAVES; i++) {
            float ring = sin(distance(vUv, waveCenters[i]) * 60.0 - time * 8.0);
            rippleRing += smoothstep(0.02, 0.01, abs(ring)) * 0.01;
        }
        pos.z += rippleRing;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
    `,
    `
    varying vec2 vUv;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform sampler2D normalMap;
    uniform vec3 lightPosition;
    uniform vec3 glowColor;
    uniform vec2 glowCenter;

    void main() {
        vec3 normal = texture2D(normalMap, vUv).rgb * 2.0 - 1.0;
        vec3 color = mix(color1, color2, vUv.y) + normal * 0.05;

        vec3 lightDir = normalize(lightPosition - vec3(vUv, 1.0));
        float spec = pow(max(dot(normal, lightDir), 0.0), 16.0);
        vec3 specular = vec3(1.0) * spec * 0.5;

        float dist = distance(vUv, glowCenter);
        float glow = smoothstep(0.2, 0.0, dist) * 0.6;
        vec3 finalGlow = glowColor * glow;

        gl_FragColor = vec4(color + specular + finalGlow, 1.0);
    }
    `
);
extend({ WaveShaderMaterial });

function ParticleSplash({ point }) {
    const count = 20;
    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 0.1;
            const x = (point[0] - 0.5) * 10 + Math.cos(angle) * radius;
            const y = 0.05;
            const z = (point[1] - 0.5) * 10 + Math.sin(angle) * radius;
            positions.set([x, y, z], i * 3);
        }
        return positions;
    }, [point]);

    return (
        <points>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial color="skyblue" size={0.05} sizeAttenuation transparent opacity={0.6} />
        </points>
    );
}

function MovingWaves() {
    const meshRef = useRef();
    const normalMap = useLoader(TextureLoader, normalMapURL);
    const [hovered, setHovered] = useState(false);
    const [waveCenters, setWaveCenters] = useState([]);
    const [splashPoints, setSplashPoints] = useState([]);
    const { mouse } = useThree();

    useMemo(() => {
        normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
        normalMap.repeat.set(4, 4);
    }, [normalMap]);

    useFrame(({ clock }) => {
        const mesh = meshRef.current;
        const material = mesh?.material;
        if (material?.uniforms) {
            const time = clock.getElapsedTime();
            material.uniforms.time.value = time;
            material.uniforms.waveHeight.value = waveCenters.length > 0 ? 0.15 : 0.0;

            const r = 0.2 + 0.2 * Math.sin(time);
            const g = 0.5 + 0.3 * Math.sin(time * 1.5);
            const b = 1.0;
            material.uniforms.glowColor.value.setRGB(hovered ? r : 0, hovered ? g : 0, hovered ? b : 0);

            const x = (mouse.x + 1) / 2;
            const y = (mouse.y + 1) / 2;
            material.uniforms.glowCenter.value.set(x, y);

waveCenters.forEach((pt, i) => {
    if (pt) {
        material.uniforms.waveCenters.value[i].set(...pt);
    } else {
        material.uniforms.waveCenters.value[i].set(-1, -1);
    }
});
        }
    });

    const handleClick = (event) => {
        const point = event.uv;
        setWaveCenters((prev) => {
            const updated = [...prev, [point.x, point.y]];
            return updated.slice(-10);
        });
        setSplashPoints((prev) => [...prev, point]);
    };

    return (
        <>
            <mesh
                ref={meshRef}
                rotation={[-Math.PI / 2, 0, 0]}
                receiveShadow
                castShadow
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={handleClick}
            >
                <planeGeometry args={[10, 10, 200, 200]} />
                <waveShaderMaterial normalMap={normalMap} />
            </mesh>
            {splashPoints.map((point, i) => (
                <ParticleSplash key={i} point={point} />
            ))}
        </>
    );
}

export default function WaveMesh({ width = '100vw', height = '100vh' }) {
    return (
        <div style={{ width, height }}>
            <Canvas camera={{ position: [0, 2, 5], fov: 50 }} shadows>
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
                <MovingWaves />
            </Canvas>
        </div>
    );
}
