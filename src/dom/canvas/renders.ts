import { ITank } from '../../models/Tank/interface';
import MotionLayer from '../layers/Motion/MotionLayer';


export class Render {
  static renderTank(tank: ITank) {
    const ctx = MotionLayer.ctx;

    if (tank.prevPosition) {
      ctx?.clearRect(
        tank.prevPosition.x,
        tank.prevPosition.y,
        tank.height,
        tank.width,
      );
    }

    ctx?.fillRect(
      tank.position.x,
      tank.position.y,
      tank.height,
      tank.width,
    );
  }
}