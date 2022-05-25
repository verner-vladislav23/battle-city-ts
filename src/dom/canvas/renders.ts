import MotionLayerCtx from 'src/dom/layers/Motion/MotionLayerCtx';
import MapLayerCtx from 'src/dom/layers/Map/MapLayerCtx';
import { ITank } from 'src/models/Tank/interface';
import { IBullet } from 'src/models/Bullet/interface';
import { IMap } from 'src/models/Map/interface';

export class Render {
  static renderMap(map: IMap) {
    const ctx = MapLayerCtx.ctx;

    for (const mapEntity of map.entities) {
      const { position, size } = mapEntity;
      ctx.strokeRect(position.x, position.y, size.width, size.height);
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

  static clearBullet(bullet: IBullet) {
    const ctx = MotionLayerCtx.ctx;

    ctx.clearRect(
      bullet.position.x,
      bullet.position.y,
      bullet.width,
      bullet.height,
    );
  }
}
