import Motion from '../Motion/Motion';
import { Position } from '../../types/position';
import { Render } from '../../dom/canvas/renders';
import { IBullet } from './interface';
import { TANK_DIRECTION, TANK_HEIGHT, TANK_WIDTH } from '../Tank/constants';
import { TankDirection } from '../Tank/types';
import {
  BULLET_STEP,
  BULLET_WIDTH,
  BULLET_HEIGHT,
  BULLET_MAX_COUNT_UPDATES_POSITION,
} from './constants';

export default class Bullet extends Motion implements IBullet {
  private readonly _intervalId: number;
  private _tick: number;
  private _destructed: boolean;

  constructor(public tankPosition: Position, tankDirection: TankDirection) {
    super(tankPosition, BULLET_HEIGHT, BULLET_WIDTH, BULLET_STEP);
    this.position = this.calculateBulletStartPosition(
      tankPosition,
      tankDirection,
    );
    this._destructed = false;
    this._tick = 0;

    this._intervalId = window.setInterval(() => {
      this.updatePositionByTankDirection(tankDirection);
    }, 5);
  }

  private calculateBulletStartPosition(
    tankPosition: Position,
    tankDirection: TankDirection,
  ): Position {
    switch (tankDirection) {
      case TANK_DIRECTION.UP: {
        return {
          x: tankPosition.x + TANK_WIDTH / 2 - BULLET_HEIGHT / 2,
          y: tankPosition.y - BULLET_HEIGHT,
        };
      }
      case TANK_DIRECTION.RIGHT: {
        return {
          x: tankPosition.x + TANK_WIDTH,
          y: tankPosition.y + TANK_HEIGHT / 2 - BULLET_HEIGHT / 2,
        };
      }
      case TANK_DIRECTION.LEFT: {
        return {
          x: tankPosition.x - BULLET_WIDTH,
          y: tankPosition.y + TANK_HEIGHT / 2 - BULLET_HEIGHT / 2,
        };
      }
      case TANK_DIRECTION.DOWN: {
        return {
          x: tankPosition.x + TANK_WIDTH / 2 - BULLET_HEIGHT / 2,
          y: tankPosition.y + TANK_HEIGHT,
        };
      }
    }

    return tankPosition;
  }

  public destroy(): void {
    this._destructed = true;
    window.clearInterval(this._intervalId);
    this.clear();
  }

  private updatePositionByTankDirection(tankDirection: TankDirection): void {
    if (this._tick > BULLET_MAX_COUNT_UPDATES_POSITION) {
      this.destroy();
      return;
    }

    switch (tankDirection) {
      case TANK_DIRECTION.UP: {
        this.moveUp();
        break;
      }
      case TANK_DIRECTION.RIGHT: {
        this.moveRight();
        break;
      }
      case TANK_DIRECTION.LEFT: {
        this.moveLeft();
        break;
      }
      case TANK_DIRECTION.DOWN: {
        this.moveDown();
        break;
      }
    }

    if (!this._destructed) {
      this.render();
      this._tick++;
    }
  }

  render() {
    Render.renderBullet(this);
  }

  clear() {
    Render.clearBullet(this);
  }
}
