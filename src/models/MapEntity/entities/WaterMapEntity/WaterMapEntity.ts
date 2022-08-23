import Render from 'src/dom/canvas/renders';
import MapEntity from '../../MapEntity';
import { WaterMapEntityType } from '../../types';
import { Position } from 'src/types/position';

export default class WaterMapEntity extends MapEntity<WaterMapEntityType> {
  constructor(position: Position) {
    super(WaterMapEntity.makeEntityProps(position));
  }

  static makeEntityProps(position: Position): WaterMapEntityType {
    return {
      type: 'water',
      destructible: false,
      surmountable: true,
      size: { width: 40, height: 40 },
      position,
    };
  }

  static create(position: Position) {
    new WaterMapEntity(position).create();
  }

  render() {
    Render.renderWater(this._entity);
  }
}
