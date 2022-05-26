import MapEntity from '../MapEntity/MapEntity';
import { WallMapEntityType } from '../MapEntity/types';
import { Position } from '../../types/position';

export default class WallMapEntity extends MapEntity<WallMapEntityType> {
  private _wall: WallMapEntityType;
  constructor(position: Position) {
    const wallEntity: WallMapEntityType = {
      type: 'wall',
      destructible: true,
      surmountable: false,
      size: { width: 10, height: 10 },
      position,
    };
    super(wallEntity);
    this._wall = wallEntity;
  }
}