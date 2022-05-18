import MotionLayerCtx from '../layers/Motion/MotionLayerCtx';
import MapLayerCtx from '../layers/Map/MapLayerCtx';
import { ITank } from '../../models/Tank/interface';
import { IBullet } from '../../models/Bullet/interface';
import { IMap } from '../../models/Map/interface';

export class Render {
  static renderMap(map: IMap) {
    const ctx = MapLayerCtx.ctx;

    for (const mapEntity of map.entities) {
      const { position, size } = mapEntity;
      ctx.fillRect(position.x, position.y, size.width, size.height);
    }
  }

  static renderTank(tank: ITank) {
    const ctx = MotionLayerCtx.ctx;

    if (tank.prevPosition) {
      ctx.clearRect(
        tank.prevPosition.x,
        tank.prevPosition.y,
        tank.width,
        tank.height,
      );
    }

    ctx.fillRect(tank.position.x, tank.position.y, tank.width, tank.height);
  }

  static renderBullet(bullet: IBullet) {
    const ctx = MotionLayerCtx.ctx;

    if (bullet.prevPosition) {
      ctx.clearRect(
        bullet.prevPosition.x,
        bullet.prevPosition.y,
        bullet.width,
        bullet.height,
      );
    }

    ctx.fillRect(
      bullet.position.x,
      bullet.position.y,
      bullet.width,
      bullet.height,
    );
  }
}
