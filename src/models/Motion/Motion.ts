import { IMotion } from './interface';
import { PrevPosition, CollisionHandler } from './types';
import { Position } from '../../types/position';
import Map from '../Map/Map';
import { IMapEntity } from '../MapEntity/interface';

const DEFAULT_STEP = 10;

export default abstract class Motion implements IMotion {
  public position: Position;
  public prevPosition: PrevPosition;
  public onCollision?: CollisionHandler<IMapEntity>;
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
    this.onCollision = undefined;
    this._step = step || DEFAULT_STEP;
  }

  private move(position: Position): void {
    this.prevPosition = this.position;
    this.position = position;
  }

  private getNextPosition2(nextPosition1: Position) {
    return {
      x: nextPosition1.x + this.width,
      y: nextPosition1.y + this.height,
    };
  }

  private handleCollision(
    intentNextP1: Position,
    intentNextP2: Position,
  ): void {
    const map = Map.getMap();
    const collisions = map.getCollisions(intentNextP1, intentNextP2);

    if (collisions.length === 0) {
      this.move(intentNextP1);
      return;
    }

    this.onCollision?.(collisions, map, intentNextP1, intentNextP2);
  }

  public moveRight(): void {
    const intentNextPosition1 = {
      ...this.position,
      x: this.position.x + this._step,
    };
    const intentNextPosition2 = this.getNextPosition2(intentNextPosition1);

    this.handleCollision(intentNextPosition1, intentNextPosition2);
  }

  public moveLeft(): void {
    const intentNextPosition1 = {
      ...this.position,
      x: this.position.x - this._step,
    };
    const intentNextPosition2 = this.getNextPosition2(intentNextPosition1);

    this.handleCollision(intentNextPosition1, intentNextPosition2);
  }

  public moveUp(): void {
    const intentNextPosition1 = {
      ...this.position,
      y: this.position.y - this._step,
    };
    const intentNextPosition2 = this.getNextPosition2(intentNextPosition1);

    this.handleCollision(intentNextPosition1, intentNextPosition2);
  }

  public moveDown(): void {
    const intentNextPosition1 = {
      ...this.position,
      y: this.position.y + this._step,
    };
    const intentNextPosition2 = this.getNextPosition2(intentNextPosition1);

    this.handleCollision(intentNextPosition1, intentNextPosition2);
  }
}
