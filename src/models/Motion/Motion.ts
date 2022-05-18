import { IMotion } from './interface';
import { PrevPosition } from './types';
import { Position } from '../../types/position';
import Map from '../Map/Map';

const DEFAULT_STEP = 10;

export default abstract class Motion implements IMotion {
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
    const nextPosition1 = { ...this.position, x: this.position.x + this._step };
    const nextPosition2 = {
      x: nextPosition1.x + this.width,
      y: nextPosition1.y + this.height,
    };

    if (Map.getMap().hasCollision(nextPosition1, nextPosition2)) {
      console.log('collision');
    }

    this.move(nextPosition1);
  }

  public moveLeft(): void {
    this.move({ ...this.position, x: this.position.x - this._step });
  }

  public moveUp(): void {
    this.move({ ...this.position, y: this.position.y - this._step });
  }

  public moveDown(): void {
    this.move({ ...this.position, y: this.position.y + this._step });
  }
}
