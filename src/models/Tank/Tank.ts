import { Position } from '../../types/position';
import { Render } from '../../dom/canvas/renders';

import { ITank } from './interface';
import Motion from '../Motion/Motion';
import Bullet from '../Bullet/Bullet';
import {
  TANK_HEIGHT,
  TANK_WIDTH,
  TANK_STEP,
  TANK_DIRECTION,
  INITIAL_TANK_DIRECTION,
} from './constants';
import { TankDirection } from './types';

export default class Tank extends Motion implements ITank {
  private _direction: TankDirection;

  constructor(public position: Position) {
    super(position, TANK_HEIGHT, TANK_WIDTH, TANK_STEP);
    this._direction = INITIAL_TANK_DIRECTION;
  }

  private changeDirection(direction: TankDirection) {
    this._direction = direction;
  }

  public moveRight() {
    super.moveRight();
    this.changeDirection(TANK_DIRECTION.RIGHT);
  }

  public moveLeft() {
    super.moveLeft();
    this.changeDirection(TANK_DIRECTION.LEFT);
  }

  public moveUp() {
    super.moveUp();
    this.changeDirection(TANK_DIRECTION.UP);
  }

  public moveDown() {
    super.moveDown();
    this.changeDirection(TANK_DIRECTION.DOWN);
  }

  public get direction(): TankDirection {
    return this._direction;
  }

  public shot(): Bullet {
    const bullet = new Bullet(this.position, this.direction);

    bullet.onCollision = (mapEntities, map) => {
      mapEntities.forEach(mapEntity => {
        if (mapEntity.type === 'wall') {
          mapEntity.destroy();
        }
      })
      console.log(JSON.stringify(mapEntities, null, 2));

      bullet.destroy();
    };

    return bullet;
  }

  public render(): void {
    Render.renderTank(this);
  }
}
