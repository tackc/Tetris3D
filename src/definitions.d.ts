/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBoardProps {
  position?: [x: number, y: number, z: number];
}

export interface IMinoProps {
  position?: [x: number, y: number, z: number];
}

export interface ITetrominoProps {
  position?: [x: number, y: number, z: number];
  groupRef?: any;
}
