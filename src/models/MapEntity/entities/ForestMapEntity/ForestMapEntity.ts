import Render from 'src/dom/canvas/renders';
import MapEntity from '../../MapEntity';
import { Position } from '../../../../types/position';
import { ForestMapEntityType } from '../../types';

export default class ForestMapEntity extends MapEntity<ForestMapEntityType> {
  constructor(position: Position) {
    super(ForestMapEntity.makeEntityProps(position));
  }

  static makeEntityProps(position: Position): ForestMapEntityType {
    return {
      type: 'forest',
      destructible: false,
      surmountable: true,
      size: { width: 40, height: 40 },
      position,
    };
  }

  static create(position: Position) {
    new ForestMapEntity(position).create();
  }

  render() {
    Render.renderForest(this._entity);
  }
}
