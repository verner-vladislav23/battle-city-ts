import { Position } from '../../types/position';
import { DynamicMapEntityID } from '../MapEntity/types';
import { IMapEntity } from '../MapEntity/interface';

export interface IMap {
  positions: Array<Position>;
  entities: IterableIterator<IMapEntity>;
  generateMap();
  render(): void;
  getCollisions(
    p1: Position,
    p2: Position,
    entityID?: DynamicMapEntityID,
  ): Array<IMapEntity>;
  getMapEntityByPosition(position: Position): IMapEntity | undefined;
  addEntity(mapEntity: IMapEntity): IMapEntity;
  removeEntity(position: Position): void;
}
