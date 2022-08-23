import MotionLayerCtx from '../layers/Motion/MotionLayerCtx';
import MapLayerCtx from '../layers/Map/MapLayerCtx';
import { ITank } from '../../models/Tank/interface';
import { IBullet } from '../../models/Bullet/interface';
import { IMap } from '../../models/Map/interface';
import {
  BoxMapEntityType,
  ForestMapEntityType,
  WallMapEntityType,
  WaterMapEntityType,
} from '../../models/MapEntity/types';

export class Render {
  static renderMap(map: IMap) {
    for (const mapEntity of map.entities) {
      mapEntity.render();
    }
  }

  static renderWall(wall: WallMapEntityType) {
    const ctx = MapLayerCtx.ctx;

    ctx.fillStyle = 'black';
    ctx.fillRect(
      wall.position.x,
      wall.position.y,
      wall.size.width,
      wall.size.height,
    );
  }

  static clearWall(wall: WallMapEntityType) {
    const ctx = MapLayerCtx.ctx;

    ctx.clearRect(
      wall.position.x,
      wall.position.y,
      wall.size.width,
      wall.size.height,
    );
  }

  static renderBox(box: BoxMapEntityType) {
    const ctx = MapLayerCtx.ctx;

    ctx.fillStyle = 'grey';
    ctx.fillRect(
      box.position.x,
      box.position.y,
      box.size.width,
      box.size.height,
    );
  }

  static clearBox(box: BoxMapEntityType) {
    const ctx = MapLayerCtx.ctx;

    ctx.clearRect(
      box.position.x,
      box.position.y,
      box.size.width,
      box.size.height,
    );
  }

  static renderWater(water: WaterMapEntityType) {
    const ctx = MapLayerCtx.ctx;

    ctx.fillStyle = 'blue';
    ctx.fillRect(
      water.position.x,
      water.position.y,
      water.size.width,
      water.size.height,
    );
  }

  static renderForest(forest: ForestMapEntityType) {
    const ctx = MapLayerCtx.ctx;

    ctx.fillStyle = 'green';
    ctx.fillRect(
      forest.position.x,
      forest.position.y,
      forest.size.width,
      forest.size.height,
    );
  }

  static renderTank(tank: ITank) {
    const ctx = MotionLayerCtx.ctx;

    ctx.fillStyle = 'orange';
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

  static clearTank(tank: ITank) {
    const ctx = MotionLayerCtx.ctx;

    ctx.clearRect(
      tank.position.x,
      tank.position.y,
      tank.width,
      tank.height,
    )
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
