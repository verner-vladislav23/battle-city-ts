import { Render } from '../../dom/canvas/renders';
import { IMap } from './interface';
import { Position } from '../../types/position';
import { MapEntity, MapKey, Wall } from './types';

const wall: Wall = {
  type: 'wall',
  destructible: false,
  surmountable: false,
  position: { x: 100, y: 200 },
  size: { width: 50, height: 50 },
};

export default class Mapper implements IMap {
  private static instance: Mapper;
  private readonly _mapEntities: Map<MapKey, MapEntity>;

  private constructor() {
    this._mapEntities = new Map<MapKey, MapEntity>();
    this.generateMap();
  }

  static getMap(): Mapper {
    if (!this.instance) {
      this.instance = new Mapper();
    }

    return this.instance;
  }

  private generateMap(): void {
    for (let y = 0; y < 400; y += 50) {
      const position = { x: 100, y };
      const wallWithPosition: Wall = {
        ...wall,
        position,
      };

      this._mapEntities.set(position, wallWithPosition);
    }
  }

  private filterMapPositions(
    positionFilterFn: (p: Position) => boolean,
  ): Array<Position> {
    return [...this.positions].filter(positionFilterFn);
  }

  private isIntersectionWithMapEntity(
    mapEntityPosition: Position,
    entityP1: Position,
    entityP2: Position,
  ): boolean {
    const mapEntity = this._mapEntities.get(mapEntityPosition) as MapEntity;
    const { position: mapEntityP1, size: mapEntitySize } = mapEntity;

    const mapEntityP2 = {
      x: mapEntityP1.x + mapEntitySize.width,
      y: mapEntityP1.y + mapEntitySize.height,
    };

    return (
      mapEntityP1.y < entityP2.y ||
      mapEntityP2.y > entityP1.y ||
      mapEntityP2.x < entityP1.x ||
      mapEntityP1.x > entityP2.x
    );
  }

  public hasCollision(p1: Position, p2: Position): boolean {
    const yDelta = wall.size.height;
    const yStart = p1.y - yDelta;
    const yFinish = p1.y + yDelta;

    const xDelta = p2.x - p1.x;
    const xStart = p1.x - xDelta;
    const xFinish = p1.x + xDelta;

    return this.filterMapPositions(position => {
      return (
        position.y > yStart &&
        position.y < yFinish &&
        position.x > xStart &&
        position.x < xFinish
      );
    }).some(mapEntityPosition =>
      this.isIntersectionWithMapEntity(mapEntityPosition, p1, p2),
    );
  }

  public get entities(): IterableIterator<MapEntity> {
    return this._mapEntities.values();
  }

  public get positions(): IterableIterator<MapKey> {
    return this._mapEntities.keys();
  }

  public render(): void {
    Render.renderMap(this);
  }
}
