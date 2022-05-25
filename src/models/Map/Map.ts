import { Render } from 'src/dom/canvas/renders';
import { IMap } from './interface';
import { Position } from 'src/types/position';
import { MapEntity, Wall } from './types';

const wall: Wall = {
  type: 'wall',
  destructible: false,
  surmountable: false,
  position: { x: 100, y: 200 },
  size: { width: 50, height: 50 },
};

export default class Mapper implements IMap {
  private static instance: Mapper;
  private readonly _mapEntities: Map<Position, MapEntity>;

  private constructor() {
    this._mapEntities = new Map<Position, MapEntity>();
    this.generateMap();
  }

  static getMap(): Mapper {
    if (!this.instance) {
      this.instance = new Mapper();
    }

    return this.instance;
  }

  private generateMap(): void {
    for (let y = 200; y < 400; y += 50) {
      const position = { x: 100, y };
      const wallWithPosition: Wall = {
        ...wall,
        position,
      };

      this._mapEntities.set(position, wallWithPosition);
    }
    for (let x = 150; x < 250; x += 50) {
      const position = { x, y: 300 };
      const wallWithPosition: Wall = {
        ...wall,
        position,
      };

      this._mapEntities.set(position, wallWithPosition);
    }
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

    const entityP3 = {
      x: entityP2.x,
      y: entityP1.y,
    };

    const entityP4 = {
      x: entityP1.x,
      y: entityP2.y,
    };

    return (
      (entityP1.y < mapEntityP2.y &&
        entityP1.y >= mapEntityP1.y &&
        entityP1.x >= mapEntityP1.x &&
        entityP1.x <= mapEntityP2.x) ||
      (entityP2.y < mapEntityP2.y &&
        entityP2.y >= mapEntityP1.y &&
        entityP2.x >= mapEntityP1.x &&
        entityP2.x <= mapEntityP2.x) ||
      (entityP3.y < mapEntityP2.y &&
        entityP3.y >= mapEntityP1.y &&
        entityP3.x >= mapEntityP1.x &&
        entityP3.x <= mapEntityP2.x) ||
      (entityP4.y < mapEntityP2.y &&
        entityP4.y >= mapEntityP1.y &&
        entityP4.x >= mapEntityP1.x &&
        entityP4.x <= mapEntityP2.x)
    );
  }

  public getCollisions(p1: Position, p2: Position): Array<MapEntity> {
    const yDelta = wall.size.height;
    const yStart = p1.y - yDelta;
    const yFinish = p1.y + yDelta;

    const xDelta = wall.size.width;
    const xStart = p1.x - xDelta;
    const xFinish = p1.x + xDelta;

    let collectionPositionsByY: Array<never | Position> = [];
    for (let y = yStart; y < yFinish; y++) {
      const testPositionY = this.positions.filter(p => p.y === y);
      if (testPositionY) {
        collectionPositionsByY = [...collectionPositionsByY, ...testPositionY];
      }
    }

    let collectionPositionsByX: Array<never | Position> = [];
    for (let x = xStart; x < xFinish; x++) {
      const testPositionX = collectionPositionsByY.filter(p => p.x === x);
      if (testPositionX.length !== 0) {
        collectionPositionsByX = [...collectionPositionsByX, ...testPositionX];
      }
    }

    if (collectionPositionsByX.length === 0) {
      return [];
    }

    const intersectedPositions = collectionPositionsByX.filter(
      existedMapPosition =>
        this.isIntersectionWithMapEntity(existedMapPosition, p1, p2),
    );
    return intersectedPositions.map(position =>
      this.getMapEntityByPosition(position),
    ) as MapEntity[];
  }

  public get entities(): IterableIterator<MapEntity> {
    return this._mapEntities.values();
  }

  public getMapEntityByPosition(position: Position): MapEntity | undefined {
    return Mapper.instance._mapEntities.get(position);
  }

  public get positions(): Array<Position> {
    return [...Mapper.instance._mapEntities.keys()];
  }

  public addEntity(mapEntity: MapEntity): void {
    Mapper.instance._mapEntities.set(mapEntity.position, mapEntity);
  }

  public removeEntityByPosition(position: Position): void {
    Mapper.instance._mapEntities.delete(position);
  }

  public render(): void {
    Render.renderMap(this);
  }
}
