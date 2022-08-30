import { Position } from 'src/types/position';
import Mapper from '../../Map/Map';
import { DynamicMapEntityType } from '../types';

interface IDynamicMapEntity {
  readonly id: DynamicMapEntityType['id'];
  readonly isStatic: DynamicMapEntityType['isStatic'];
  readonly type: DynamicMapEntityType['type'];
  readonly destructible: DynamicMapEntityType['destructible'];
  readonly size: DynamicMapEntityType['size'];
  position: DynamicMapEntityType['position'];
  destroy(cb: () => void): void;
  updatePosition(prevPosition: Position, newPosition: Position): void;
}

export default class DynamicMapEntity<T extends DynamicMapEntityType>
  implements IDynamicMapEntity
{
  public readonly id: DynamicMapEntityType['id'];
  public readonly isStatic: DynamicMapEntityType['isStatic'];
  public readonly type: DynamicMapEntityType['type'];
  public readonly destructible: DynamicMapEntityType['destructible'];
  public readonly surmountable: DynamicMapEntityType['surmountable'];
  public readonly size: DynamicMapEntityType['size'];
  public position: DynamicMapEntityType['position'];

  constructor(entity: T) {
    this.id = entity.id;
    this.isStatic = entity.isStatic;
    this.destructible = entity.destructible;
    this.surmountable = entity.surmountable;
    this.type = entity.type;
    this.position = entity.position;
    this.size = entity.size;

    const map = Mapper.getMap();
    map.addEntity(this);
  }

  public updatePosition(
    prevPosition: Position | undefined,
    newPosition: Position,
  ): void {
    this.position = newPosition;

    const map = Mapper.getMap();

    if (prevPosition) {
      map.removeEntity(prevPosition);
    }
    map.addEntity(this);
  }

  public destroy(cb: () => void) {
    Mapper.getMap().removeEntity(this.position);
    cb();
  }
}
