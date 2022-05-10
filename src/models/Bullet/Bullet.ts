import Motion from '../Motion/Motion';
import { Position } from '../../types/position';
import { Render } from '../../dom/canvas/renders';
import { IBullet } from './interface';
import { TANK_DIRECTION } from '../Tank/constants';
import { TankDirection } from '../Tank/types';
import { BULLET_STEP, BULLET_WIDTH, BULLET_HEIGHT } from './constants';

export default class Bullet extends Motion implements IBullet {
  private readonly updatePositionIntervalId: number;
  private tick: number;

  constructor(public position: Position, direction: TankDirection) {
    super(position, BULLET_HEIGHT, BULLET_WIDTH, BULLET_STEP);
    this.tick = 0;

    this.updatePositionIntervalId = window.setInterval(() => {
      this.updatePositionByTankDirection(direction);
      this.render();
    }, 5);
  }

  private updatePositionByTankDirection(tankDirection: TankDirection): void {
    if (this.tick > 500) {
      window.clearInterval(this.updatePositionIntervalId);
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

    this.tick++;
  }

  render() {
    Render.renderBullet(this);
  }
}
