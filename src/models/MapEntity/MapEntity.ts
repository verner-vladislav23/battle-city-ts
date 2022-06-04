import Mapper from '../Map/Map';
import { IMapEntity } from './interface';
import { MapEntityType } from './types';

export default abstract class MapEntity<T extends MapEntityType>
  implements IMapEntity
{
  public readonly type: MapEntityType['type'];
  public readonly destructible: MapEntityType['destructible'];
  public readonly surmountable: MapEntityType['surmountable'];
  public readonly position: MapEntityType['position'];
  public readonly size: MapEntityType['size'];
  protected readonly _entity: T;

  protected constructor(entity: T) {
    this.type = entity.type;
    this.destructible = entity.destructible;
    this.surmountable = entity.surmountable;
    this.position = entity.position;
    this.size = entity.size;
    this._entity = entity;
  }

  abstract render();

  create(): IMapEntity {
    return Mapper.getMap().addEntity(this);
  }

  destroy() {
    Mapper.getMap().removeEntity(this._entity);
  }
}
