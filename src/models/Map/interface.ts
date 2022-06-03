import { Position } from '../../types/position';

import { IMapEntity } from '../MapEntity/interface';
import { MapEntityType } from '../MapEntity/types';

export interface IMap {
  positions: Array<Position>;
  entities: IterableIterator<IMapEntity>;
  generateMap();
  render(): void;
  getCollisions(p1: Position, p2: Position): Array<IMapEntity>;
  getMapEntityByPosition(position: Position): IMapEntity | undefined;
  addEntity(mapEntity: IMapEntity): IMapEntity;
  removeEntity(mapEntity: MapEntityType | IMapEntity): void;
}
