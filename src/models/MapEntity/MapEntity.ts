import Mapper from '../Map/Map';
import { IMapEntity } from './interface';
import { Position } from '../../types/position';

export default abstract class MapEntity implements IMapEntity {
  public position: Position;

  protected constructor(position: Position) {
    this.position = position;
  }

  public destroy() {
    Mapper.getMap().removeEntityByPosition(this.position);
  }
}