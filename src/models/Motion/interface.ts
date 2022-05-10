import { Position } from '../../types/position';

export interface IMotion {
  position: Position;
  prevPosition: Position | undefined;
  height: number;
  width: number;
  moveRight(): void;
  moveLeft(): void;
  moveUp(): void;
  moveDown(): void;
}
