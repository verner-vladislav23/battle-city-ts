import { Position } from './types';

export interface ITank {
  position: Position;
  height: number;
  width: number;
  moveRight(): void;
  moveLeft(): void;
  moveUp(): void;
  moveDown(): void;
}
