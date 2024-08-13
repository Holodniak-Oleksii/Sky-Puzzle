import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { FC, memo, Suspense, useRef } from 'react';
import * as THREE from 'three';

interface ITheeDModelLoaderProps {
  url: string;
}

const Model: FC<ITheeDModelLoaderProps> = ({ url }) => {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Object3D>(scene);

  scene.position.set(0, 0, -70);
  scene.rotation.set(Math.PI / 6, 0, 0);
  scene.scale.set(1, 1, 1);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003;
    }
  });

  return <primitive ref={modelRef} object={scene} />;
};

const TheeDModelLoader: FC<ITheeDModelLoaderProps> = ({ url }) => {
  return (
    <Canvas
      resize={{
        scroll: false,
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Model url={url} />
      </Suspense>
    </Canvas>
  );
};

export default memo(TheeDModelLoader);
