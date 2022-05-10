import { ITank } from '../../models/Tank/interface';
import MotionLayerCtx from '../layers/Motion/MotionLayerCtx';


export class Render {
  static renderTank(tank: ITank) {
    const ctx = MotionLayerCtx.ctx;

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