import MapEntity from '../MapEntity/MapEntity';
import { Position } from '../../types/position';

export default class WallMapEntity extends MapEntity {
  constructor(position: Position) {
    super(position);
  }
}