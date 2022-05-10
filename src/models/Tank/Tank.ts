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
  INITIAL_TANK_DIRECTION
} from './constants';
import { TankDirection } from './types';

export default class Tank extends Motion implements ITank {
  private _direction: TankDirection;

  constructor(public position: Position) {
    super(position, TANK_HEIGHT, TANK_WIDTH, TANK_STEP);
    this._direction = INITIAL_TANK_DIRECTION;
  }

  public get direction(): TankDirection {
    if (!this.prevPosition) {
      return INITIAL_TANK_DIRECTION;
    }

    if (this.prevPosition.y < this.position.y) {
      return TANK_DIRECTION.DOWN;
    }

    if (this.prevPosition.y > this.position.y) {
      return TANK_DIRECTION.UP;
    }

    if (this.prevPosition.x < this.position.x) {
      return TANK_DIRECTION.RIGHT;
    }

    if (this.prevPosition.x > this.position.x) {
      return TANK_DIRECTION.LEFT;
    }

      return TANK_DIRECTION.DOWN;
  }

  public shot(): Bullet {
    const bullet = new Bullet(this.position, this.direction);

    return bullet;
  }

  public render(): void {
    Render.renderTank(this);
  }
}
