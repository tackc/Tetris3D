import { ITetrominoProps } from "../definitions";
import Mino from "./Mino";

const O = ({ position, groupRef }: ITetrominoProps) => {
  return (
    <group position={position} ref={groupRef}>
      <Mino position={[-0.5, 0.5, 0]} />
      <Mino position={[0.5, 0.5, 0]} />
      <Mino position={[-0.5, -0.5, 0]} />
      <Mino position={[0.5, -0.5, 0]} />
    </group>
  );
};

export default O;
