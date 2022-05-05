import { Position } from '../../types/position';

export interface IIterable {
  position: Position;
  currentPosition: Position;
  prevPosition: Position | undefined;
  height: number;
  width: number;
  moveRight(): void;
  moveLeft(): void;
  moveUp(): void;
  moveDown(): void;
}
