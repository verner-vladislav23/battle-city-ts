import { Position } from './types';

export interface IIterable {
  position: Position;
  height: number;
  width: number;
  moveRight(): void;
  moveLeft(): void;
  moveUp(): void;
  moveDown(): void;
}