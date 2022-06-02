import { WallMapEntityType } from '../MapEntity/types';
import { Position } from '../../types/position';

export default class WallMapEntity {
  static create(position: Position): WallMapEntityType {
    return {
      type: 'wall',
      destructible: true,
      surmountable: false,
      size: { width: 10, height: 10 },
      position,
    };
  }
}