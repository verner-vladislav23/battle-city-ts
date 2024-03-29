import { Position } from 'src/types/position';
import Render from 'src/dom/canvas/renders';
import { delay, generateID } from 'src/utils';

import { ITank } from './interface';
import { TankMapEntityType } from '../MapEntity/types';
import Motion from '../Motion/Motion';
import Bullet from '../Bullet/Bullet';
import {
  TANK_DIRECTION,
  TANK_MAP_ENTITY_PROPS,
  INITIAL_TANK_DIRECTION,
  BULLET_GENERATE_TIMOUT,
} from './constants';
import { TankDirection } from './types';

export default class Tank extends Motion<TankMapEntityType> implements ITank {
  protected _direction: TankDirection;
  protected _canCreateBullet: boolean;

  constructor(public position: Position) {
    super({
      ...TANK_MAP_ENTITY_PROPS,
      position,
      id: generateID(),
    });

    this._direction = INITIAL_TANK_DIRECTION;
    this._canCreateBullet = true;
  }

  protected changeDirection(direction: TankDirection) {
    this._direction = direction;
  }

  protected createBullet(): Bullet | null {
    if (!this._canCreateBullet) {
      return null;
    }

    void delay(BULLET_GENERATE_TIMOUT).then(() => {
      this._canCreateBullet = true;
    });

    this._canCreateBullet = false;
    return new Bullet(this.position, this.direction);
  }

  public moveRight(): void {
    super.moveRight();
    this.changeDirection(TANK_DIRECTION.RIGHT);
  }

  public moveLeft(): void {
    super.moveLeft();
    this.changeDirection(TANK_DIRECTION.LEFT);
  }

  public moveUp(): void {
    super.moveUp();
    this.changeDirection(TANK_DIRECTION.UP);
  }

  public moveDown(): void {
    super.moveDown();
    this.changeDirection(TANK_DIRECTION.DOWN);
  }

  public get direction(): TankDirection {
    return this._direction;
  }

  public shot(): void {
    const bullet = this.createBullet();

    if (bullet !== null) {
      bullet.onCollision = (mapEntities, map) => {
        mapEntities.forEach(mapEntity => {
          if (mapEntity.type === 'wall') {
            bullet.destroy();
            mapEntity.destroy();
          }
          if (mapEntity.type === 'tank') {
            console.log(mapEntity);

            mapEntity.destroy(() => {
              this.clearTank();
              this._canCreateBullet = false;
            });
            bullet.destroy();
          }
        });
        // console.log(JSON.stringify(mapEntities, null, 2));

        // bullet.destroy();
      };
    }
  }

  public destroy() {
    super.destroy(() => {
      this._canCreateBullet = false;
      this.clearTank();
    });
  }

  public render(): void {
    Render.renderTank(this);
  }

  public clearTank(): void {
    Render.clearTank(this);
  }
}
