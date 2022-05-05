import Canvas from './Canvas';
import { ITank } from '../../models/Tank/interface';


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

    ctx?.fillRect(
      tank.currentPosition.x,
      tank.currentPosition.y,
      tank.height,
      tank.width,
    )
  }
}