import { useEffect } from "react";
import { ITetrominoProps } from "../definitions";
import Mino from "./Mino";

const J = ({ position, groupRef }: ITetrominoProps) => {
  console.log(groupRef);

  useEffect(() => console.log(groupRef), [groupRef]);

  return (
    <group position={position} ref={groupRef}>
      <Mino position={[-1, 0, 0]} />
      <Mino position={[0, 0, 0]} />
      <Mino position={[1, 0, 0]} />
      <Mino position={[1, 1, 0]} />
    </group>
  );
};

export default J;
