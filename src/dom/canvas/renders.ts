import Canvas from './Canvas';
import { ITank } from '../../models/Tank/interface';
import { IBullet } from '../../models/Bullet/interface';

export class Render {
  static renderTank(tank: ITank) {
    const ctx = Canvas.ctx;

    if (tank.prevPosition) {
      ctx?.clearRect(
        tank.prevPosition.x,
        tank.prevPosition.y,
        tank.height,
        tank.width,
      );
    }

    ctx?.fillRect(tank.position.x, tank.position.y, tank.height, tank.width);
  }

  static renderBullet(bullet: IBullet) {
    const ctx = Canvas.ctx;
    if (bullet.prevPosition) {
      ctx?.clearRect(
        bullet.prevPosition.x,
        bullet.prevPosition.y,
        bullet.height,
        bullet.width,
      );
    }

    ctx?.fillRect(
      bullet.position.x,
      bullet.position.y,
      bullet.height,
      bullet.width,
    );
  }
}
