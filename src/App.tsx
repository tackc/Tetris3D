import { OrbitControls, meshBounds, useHelper } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Lights from "./Lights";
import Board from "./components/Board";

const App = () => {
  // const meshRef = useRef<Mesh>(null)
  // useFrame(({state, delta},  )) => {

  // }

  return (
    <Canvas camera={{ position: [0, 10, -16] }}>
      <Lights />

      <OrbitControls target={[0, 10, 0]} />
      <axesHelper scale={[10, 10, 10]} />

      <Board />
    </Canvas>
  );
};

export default App;
