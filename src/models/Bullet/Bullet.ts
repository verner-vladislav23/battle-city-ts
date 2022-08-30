import Render from 'src/dom/canvas/renders';
import Motion from '../Motion/Motion';
import { Position } from 'src/types/position';
import MapLayerCtx from 'src/dom/layers/Map/MapLayerCtx';
import { IBullet } from './interface';
import { TANK_DIRECTION, TANK_HEIGHT, TANK_WIDTH } from '../Tank/constants';
import { TankDirection } from '../Tank/types';
import { BulletMapEntityType } from '../MapEntity/types';
import { generateID } from 'src/utils';
import {
  BULLET_WIDTH,
  BULLET_HEIGHT,
  BULLET_MAP_ENTITY_PROPS,
} from './constants';

export default class Bullet
  extends Motion<BulletMapEntityType>
  implements IBullet
{
  private _destructed: boolean;
  private animationID: number;

  constructor(public tankPosition: Position, tankDirection: TankDirection) {
    super({
      ...BULLET_MAP_ENTITY_PROPS,
      position: tankPosition,
      id: generateID(),
    });
    this.position = this.calculateBulletStartPosition(
      tankPosition,
      tankDirection,
    );
    this._destructed = false;
    this.animationID = 0;

    this.updatePositionByTankDirection(tankDirection);
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

  private isOutOfMapByTankDirection(tankDirection: TankDirection): boolean {
    if (
      tankDirection === TANK_DIRECTION.UP ||
      tankDirection === TANK_DIRECTION.DOWN
    ) {
      if (
        this.position.y + BULLET_HEIGHT >= MapLayerCtx.size.height ||
        this.position.y <= 0
      ) {
        return true;
      }
    }
    if (
      tankDirection === TANK_DIRECTION.LEFT ||
      tankDirection === TANK_DIRECTION.RIGHT
    ) {
      if (
        this.position.x + BULLET_WIDTH >= MapLayerCtx.size.width ||
        this.position.x <= 0
      ) {
        return true;
      }
    }

    return false;
  }

  private updatePositionByTankDirection(tankDirection: TankDirection): void {
    if (this.isOutOfMapByTankDirection(tankDirection)) {
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
      this.animationID = window.requestAnimationFrame(() =>
        this.updatePositionByTankDirection(tankDirection),
      );
    }
  }

  public destroy(): void {
    super.destroy(() => {
      this._destructed = true;
      this.clear();
      window.cancelAnimationFrame(this.animationID);
    });
  }

  render() {
    Render.renderBullet(this);
  }

  clear() {
    Render.clearBullet(this);
  }
}
