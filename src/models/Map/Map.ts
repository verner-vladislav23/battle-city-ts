import { IMap } from './interface';
import { MapEntity } from './types';

const MAP_ENTITIES: MapEntity[] = [
  {
    type: 'wall',
    destructible: false,
    surmountable: false,
    position: { x: 100, y: 200 },
    size: { width: 50, height: 50 },
  },
];

export default class Map implements IMap {
  get mapEntities(): MapEntity[] {
    return this._mapEntities;
  }

  set mapEntities(value: MapEntity[]) {
    this._mapEntities = value;
  }

  private _mapEntities: MapEntity[];

  constructor() {
    this._mapEntities = MAP_ENTITIES;
  }

}