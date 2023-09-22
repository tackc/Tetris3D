import { useEffect, useState } from "react";
import { ITetrominoProps } from "../definitions";
import Mino from "./Mino";

const S = ({ position, groupRef }: ITetrominoProps) => {
  const [matrix, setMatrix] = useState([
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ]);

  useEffect(() => console.log(groupRef), [groupRef]);

  return (
    <group position={[4.5 - position[0], 19.5 - position[1], 0]} ref={groupRef}>
      {matrix.map((row, i) =>
        row.map((column, j) => {
          if (column === 1) {
            return <Mino key={`${i}${j}`} position={[-j, -i, 0]} />;
          } else {
            return null;
          }
        })
      )}
    </group>
  );
};

export default S;
