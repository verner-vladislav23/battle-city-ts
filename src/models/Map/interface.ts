import { Position } from '../../types/position';
import { MapEntityType } from '../MapEntity/types';

export interface IMap {
  positions: Array<Position>;
  entities: IterableIterator<MapEntityType>;
  generateMap();
  render(): void;
  getCollisions(p1: Position, p2: Position): Array<MapEntityType>;
  getMapEntityByPosition(position: Position): MapEntityType | undefined
  addEntity(mapEntity: MapEntityType): MapEntityType;
  removeEntityByPosition(position: Position): void
}
