import {
  Environment,
  Html,
  OrbitControls,
  PerspectiveCamera,
  Plane,
  Stars,
  useTexture,
} from "@react-three/drei";
import React, {
  Suspense,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useFrame } from "@react-three/fiber";
import { angleToRadians } from "./angle";
import * as THREE from "three";
import { click } from "@testing-library/user-event/dist/click";

const SceneContainer = () => {
  const colorTexture = useTexture(
    "./textures/TexturesCom_SolarCells_1K_albedo.jpg"
  );

  const skyTexture = useTexture(
    "./textures/TexturesCom_WinterMeadow_1K_hdri_sphere_tone.jpg"
  );

  const orbitControlsRef = useRef(null);

  const [clicked, setClicked] = useState(false);
  // const [active, setactive] = useState(false);

  useFrame((state) => {
    if (!!orbitControlsRef.current) {
      const { x, y } = state.mouse;
      //console.log(y * angleToRadians(90 - 30));
      //console.log(angleToRadians(x * 24));
      orbitControlsRef.current.setAzimuthalAngle(x * angleToRadians(45));
      orbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(90 - 30));
      orbitControlsRef.current.update();
    }
  });

  useEffect(() => {
    if (!!orbitControlsRef.current) {
      console.log(orbitControlsRef.current);
    }
  }, [orbitControlsRef.current]);
  return (
    <Suspense fallback={null}>
      <PerspectiveCamera makeDefault position={[0, 2, 5]} />
      <OrbitControls
        ref={orbitControlsRef}
        minPolarAngle={angleToRadians(60)}
        maxPolarAngle={angleToRadians(80)}
      />
      <mesh
        position={[0, 0.5, 0]}
        // onClick={(e) => setClicked(!clicked)}
        castShadow
      >
        {/* args:radius,widthsegment,heightsegment */}
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={clicked ? "green" : "#f4511e"}
          metalness={0.4}
          roughness={0.1}
        />
      </mesh>
      {/* floor */}
      <mesh
        rotation={[-angleToRadians(90), 0, 0]}
        onClick={(e) => setClicked(!clicked)}
        receiveShadow
      >
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial
          map={colorTexture}
          color={clicked ? "white" : "red"}
          metalness={0.4}
          roughness={0.1}
        />
      </mesh>
      <ambientLight args={["#fffffff", 0.5]} />
      <spotLight
        args={["#ffffff", 1.5, 20, angleToRadians(45), 0.5]}
        position={[-8, 10, 0]}
      />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={1}
        fade
      />
      <Environment background>
        <mesh>
          <sphereGeometry args={[10, 25, 25]} />
          <meshBasicMaterial side={THREE.BackSide} map={skyTexture} />
        </mesh>
      </Environment>
    </Suspense>
  );
};

export default SceneContainer;
