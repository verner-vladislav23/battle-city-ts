import { IIterable } from './interface';
import { PrevPosition } from './types';
import { Position } from '../../types/position';

const DEFAULT_STEP = 10;

export default abstract class Iterable implements IIterable {
  position: Position;
  prevPosition: PrevPosition;
  readonly height: number;
  readonly width: number;
  private readonly _step: number;

  protected constructor(
    position: Position,
    height: number,
    width: number,
    step?: number,
  ) {
    this.position = position;
    this.prevPosition = undefined;
    this.height = height;
    this.width = width;
    this._step = step || DEFAULT_STEP;
  }

  private move(position: Position): void {
    this.prevPosition = this.position;
    this.position = position;
  }

  public moveRight(): void {
    this.move({ ...this.position, x: this.position.x + this._step });
  }

  public moveLeft(): void {
    this.move({ ...this.position, x: this.position.x - this._step });
  }

  public moveUp(): void {
    this.move({ ...this.position, y: this.position.y - this._step })
  }

  public moveDown(): void {
    this.move({ ...this.position, y: this.position.y + this._step });
  }
}
