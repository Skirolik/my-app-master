import { Canvas } from "@react-three/fiber";

import SceneContainer from "./SceneContainer";
import Game from "./Game";
import { Physics } from "@react-three/cannon";

function App() {
  return (
    // SAP is algorithum for physics
    <Canvas>
      <Physics broadphase="SAP" gravity={[0, -4.5, 0]}>
        <Game />
      </Physics>
    </Canvas>
  );
}

export default App;
