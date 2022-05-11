import MotionLayerCtx from '../layers/Motion/MotionLayerCtx';
import { ITank } from '../../models/Tank/interface';
import { IBullet } from '../../models/Bullet/interface';

export class Render {
  static renderTank(tank: ITank) {
    const ctx = MotionLayerCtx.ctx;

    if (tank.prevPosition) {
      ctx?.clearRect(
        tank.prevPosition.x,
        tank.prevPosition.y,
        tank.width,
        tank.height,
      );
    }

    ctx?.fillRect(tank.position.x, tank.position.y, tank.width, tank.height);
  }

  static renderBullet(bullet: IBullet) {
    const ctx = MotionLayerCtx.ctx;

    if (bullet.prevPosition) {
      ctx?.clearRect(
        bullet.prevPosition.x,
        bullet.prevPosition.y,
        bullet.width,
        bullet.height,
      );
    }

    ctx?.fillRect(
      bullet.position.x,
      bullet.position.y,
      bullet.width,
      bullet.height,
    );
  }
}
