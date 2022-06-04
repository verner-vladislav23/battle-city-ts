import { Render } from '../../../../dom/canvas/renders';
import MapEntity from '../../MapEntity';
import { BoxMapEntityType } from '../../types';
import { Position } from '../../../../types/position';

export default class BoxMapEntity extends MapEntity<BoxMapEntityType> {
  constructor(position: Position) {
    super(BoxMapEntity.makeEntityProps(position));
  }

  static makeEntityProps(position: Position): BoxMapEntityType {
    return {
      type: 'box',
      destructible: false,
      surmountable: false,
      size: { width: 40, height: 40 },
      position,
    };
  }

  static create(position: Position) {
    new BoxMapEntity(position).create();
  }

  render() {
    Render.renderBox(this._entity);
  }

  destroy() {
    Render.clearBox(this._entity);
    super.destroy();
  }
}
