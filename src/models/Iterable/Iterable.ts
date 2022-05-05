import { IIterable } from './interface';
import { Position } from '../../types/position';

const DEFAULT_STEP = 10;

export default abstract class Iterable implements IIterable {
  position: Position;
  height: number;
  width: number;
  private readonly _step: number;

  protected constructor(
    position: Position,
    height: number,
    width: number,
    step?: number,
  ) {
    this.position = position;
    this.height = height;
    this.width = width;
    this._step = step || DEFAULT_STEP;
  }

  public moveRight(): void {
    this.position = { ...this.position, x: this.position.x + this._step };
  }

  public moveLeft(): void {
    this.position = { ...this.position, x: this.position.x - this._step };
  }

  public moveUp(): void {
    this.position = { ...this.position, y: this.position.y - this._step };
  }

  public moveDown(): void {
    this.position = { ...this.position, y: this.position.y + this._step };
  }
}
