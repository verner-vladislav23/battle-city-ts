import { Position } from '../../types/position';

export interface IIterable {
  position: Position;
  prevPosition: Position | undefined;
  height: number;
  width: number;
  moveRight(): void;
  moveLeft(): void;
  moveUp(): void;
  moveDown(): void;
}
