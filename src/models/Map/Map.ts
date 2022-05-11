import { IMap } from './interface';
import { Position } from '../../types/position';
import { MapEntity, Wall, Box } from './types';


const wall: MapEntity[] = [
  {
    type: 'wall',
    destructible: false,
    surmountable: false,
    position: { x: 100, y: 200 },
    size: { width: 50, height: 50 },
  },
];

export default class Mapper implements IMap {
  private readonly _mapEntities: Map<Position, MapEntity>;
  constructor() {
    this._mapEntities = new Map<Position, MapEntity>();
    this.generateMap();
  }

  private generateMap(): void {
    for (let y = 0; y < 400; y += 50) {
      const position = { x: 100, y };
      const wall: Wall = {
        type: 'wall',
        destructible: false,
        surmountable: false,
        position,
        size: { width: 50, height: 50 },
      };
      this._mapEntities.set(position, wall)
    }
  }

  private isCollision(): boolean {
    const testPosition = { x: 40, y: 10 };
    console.log({ collision: this._mapEntities.has(testPosition) });
    return true;
  }

  public get entities(): IterableIterator<MapEntity> {
    return this._mapEntities.values();
  }
}
