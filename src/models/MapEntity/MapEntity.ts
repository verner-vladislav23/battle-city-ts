import Mapper from '../Map/Map';
import { IMapEntity } from './interface';
import { StaticMapEntityType } from './types';

export default abstract class StaticMapEntity<T extends StaticMapEntityType> {
  public readonly isStatic: StaticMapEntityType['isStatic'];
  public readonly type: StaticMapEntityType['type'];
  public readonly destructible: StaticMapEntityType['destructible'];
  public readonly surmountable: StaticMapEntityType['surmountable'];
  public readonly position: StaticMapEntityType['position'];
  public readonly size: StaticMapEntityType['size'];
  protected readonly _entity: T;

  protected constructor(entity: T) {
    this.isStatic = entity.isStatic;
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
    Mapper.getMap().removeEntity(this.position);
  }
}
