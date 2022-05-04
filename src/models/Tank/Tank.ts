import { Position } from './types';

export default class Tank {
  constructor(public position: Position) {
    this.position = position;
  }

  public moveRight(): void {
    this.position = { ...this.position, x: this.position.x + 20 };
  }
}