import { ITetrominoProps } from "../definitions";
import Mino from "./Mino";

const ActiveShape = ({ position, groupRef, shapeMatrix }: ITetrominoProps) => {
  return (
    <group position={[4.5 - position[0], 19.5 - position[1], 0]} ref={groupRef}>
      {shapeMatrix.map((row, i) =>
        row.map((column, j) => {
          if (column === 1) {
            return <Mino key={`${i}${j}`} position={[-j, -i, 0]} />;
          } else {
            return (
              <mesh position={[-j, -i, 0]}>
                <boxGeometry></boxGeometry>
                <meshStandardMaterial
                  color={0x009900}
                  opacity={0.7}
                  transparent
                />
              </mesh>
            );
          }
        })
      )}
    </group>
  );
};

export default ActiveShape;
