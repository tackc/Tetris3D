import { ITetrominoProps } from "../definitions";
import Mino from "./Mino";

const Z = ({ position, groupRef }: ITetrominoProps) => {
  return (
    <group position={position} ref={groupRef}>
      <Mino position={[0, 0, 0]} />
      <Mino position={[-1, 0, 0]} />
      <Mino position={[0, 1, 0]} />
      <Mino position={[1, 1, 0]} />
    </group>
  );
};

export default Z;
