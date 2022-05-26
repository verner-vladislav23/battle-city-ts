import { Position } from '../../types/position';
import { MapEntity } from './types';

export interface IMap {
  generateMap();
  render(): void;
  positions: Array<Position>
  entities: IterableIterator<MapEntity>;
}
