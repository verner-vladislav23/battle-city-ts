import { IIterable } from './interface';
import { Position } from '../../types/position';

const DEFAULT_STEP = 10;

export default abstract class Iterable implements IIterable {
  position: Position;
  readonly height: number;
  readonly width: number;
  private readonly _step: number;
  private _stackPosition: Position[];

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
    this._stackPosition = [this.position];
  }

  private trackPosition(): void {
    this._stackPosition.push(this.position);
  }

  public get prevPosition(): Position | undefined {
    const prevPositionIndex = this._stackPosition.length - 2;
    return this._stackPosition[prevPositionIndex];
  }

  public get currentPosition(): Position {
    const prevPositionIndex = this._stackPosition.length - 1;
    return this._stackPosition[prevPositionIndex];
  }

  public moveRight(): void {
    this.position = { ...this.position, x: this.position.x + this._step };
    this.trackPosition();
  }

  public moveLeft(): void {
    this.position = { ...this.position, x: this.position.x - this._step };
    this.trackPosition();
  }

  public moveUp(): void {
    this.position = { ...this.position, y: this.position.y - this._step };
    this.trackPosition();
  }

  public moveDown(): void {
    this.position = { ...this.position, y: this.position.y + this._step };
    this.trackPosition();
  }
}
