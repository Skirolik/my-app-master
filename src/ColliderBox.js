import { useBox } from "@react-three/cannon";
import React from "react";

const debug = false;

const ColliderBox = ({ position, scale }) => {
  useBox(() => ({
    args: scale,
    position,
    type: "Static",
  }));
  return (
    debug && (
      <mesh position={position}>
        <boxGeometry args={scale} />
        <meshBasicMaterial transparent={true} opacity={0.25} />
      </mesh>
    )
  );
};

export default ColliderBox;
