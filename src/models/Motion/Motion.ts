import { IMotion } from './interface';
import { PrevPosition, CollisionHandler } from './types';
import { Position } from '../../types/position';
import Map from '../Map/Map';
import MapLayerCtx from 'src/dom/layers/Map/MapLayerCtx';
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

    if (
      collisions.length === 0 ||
      collisions.some(entity => entity.surmountable)
    ) {
      this.move(intentNextP1);
      return;
    }

    this.onCollision?.(collisions, map, intentNextP1, intentNextP2);
  }

  protected isOutOfMap(
    intentNextP1: Position,
    intentNextP2: Position,
  ): boolean {
    return (
      intentNextP1.y < 0 ||
      intentNextP2.y > MapLayerCtx.size.height ||
      intentNextP1.x < 0 ||
      intentNextP2.x > MapLayerCtx.size.width
    );
  }

  public moveRight(): void {
    const intentNextPosition1 = {
      ...this.position,
      x: this.position.x + this._step,
    };
    const intentNextPosition2 = this.getNextPosition2(intentNextPosition1);

    if (this.isOutOfMap(intentNextPosition1, intentNextPosition2)) {
      return;
    }

    this.handleCollision(intentNextPosition1, intentNextPosition2);
  }

  public moveLeft(): void {
    const intentNextPosition1 = {
      ...this.position,
      x: this.position.x - this._step,
    };
    const intentNextPosition2 = this.getNextPosition2(intentNextPosition1);

    if (this.isOutOfMap(intentNextPosition1, intentNextPosition2)) {
      return;
    }

    this.handleCollision(intentNextPosition1, intentNextPosition2);
  }

  public moveUp(): void {
    const intentNextPosition1 = {
      ...this.position,
      y: this.position.y - this._step,
    };
    const intentNextPosition2 = this.getNextPosition2(intentNextPosition1);

    if (this.isOutOfMap(intentNextPosition1, intentNextPosition2)) {
      return;
    }

    this.handleCollision(intentNextPosition1, intentNextPosition2);
  }

  public moveDown(): void {
    const intentNextPosition1 = {
      ...this.position,
      y: this.position.y + this._step,
    };
    const intentNextPosition2 = this.getNextPosition2(intentNextPosition1);

    if (this.isOutOfMap(intentNextPosition1, intentNextPosition2)) {
      return;
    }

    this.handleCollision(intentNextPosition1, intentNextPosition2);
  }
}
