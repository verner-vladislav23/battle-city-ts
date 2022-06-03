import { Render } from '../../dom/canvas/renders';
import MapEntity from '../MapEntity/MapEntity';
import { WallMapEntityType } from '../MapEntity/types';
import { Position } from '../../types/position';

export default class WallMapEntity extends MapEntity<WallMapEntityType> {
  constructor(position: Position) {
    super(WallMapEntity.makeEntityProps(position));
  }

  static makeEntityProps(position: Position): WallMapEntityType {
    return {
      ...WallMapEntity.getEntityProps,
      position,
    };
  }

  static get getEntityProps(): Omit<WallMapEntityType, 'position'> {
    return {
      type: 'wall',
      destructible: true,
      surmountable: false,
      size: { width: 10, height: 10 },
    };
  }

  static create(position: Position) {
    const { width, height } = WallMapEntity.getEntityProps.size;

    for (let y = position.y; y < position.y + 40; y += height) {
      for (let x = position.x; x < position.x + 40; x += width) {
        new WallMapEntity({ x, y }).create();
      }
    }
  }

  render(): void {
    Render.renderWall(this._entity);
  }

  destroy() {
    Render.clearWall(this._entity);
    super.destroy();
  }
}
