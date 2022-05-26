import Mapper from '../Map/Map';
import { IMapEntity } from './interface';
import { MapEntityType } from './types';

export default abstract class MapEntity<TEntity extends MapEntityType> implements IMapEntity {
  private _map: Mapper;

  protected constructor(private _entity: TEntity) {
    this._map = Mapper.getMap();
  }

  public create() {
    this._map.addEntity(this._entity)
  }

  public destroy() {
    Mapper.getMap().removeEntityByPosition(this._entity.position);
  }
}