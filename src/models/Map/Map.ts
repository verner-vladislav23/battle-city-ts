import { Render } from '../../dom/canvas/renders';
import { IMap } from './interface';
import { Position } from '../../types/position';
import { MapEntityType, WallMapEntityType } from '../MapEntity/types';
import WallMapEntity from '../WallMapEntity/WallMapEntity';

const wall: WallMapEntityType = {
  type: 'wall',
  destructible: false,
  surmountable: false,
  position: { x: 100, y: 200 },
  size: { width: 50, height: 50 },
};

export default class Mapper implements IMap {
  private static instance: Mapper;
  private readonly _mapEntities: Map<Position, MapEntityType>;

  private constructor() {
    this._mapEntities = new Map<Position, MapEntityType>();
  }

  static getMap(): Mapper {
    if (!this.instance) {
      this.instance = new Mapper();
    }

    return this.instance;
  }

  public generateMap(): void {
    const position = { x: 100, y: 450 };
    const wall = WallMapEntity.create(position);

    const position1 = { x: 150, y: 450 };
    const wall1 = WallMapEntity.create(position1);

    const position2 = { x: 250, y: 450 };
    const wall2 = WallMapEntity.create(position2);

    this.addEntity(wall);
    this.addEntity(wall1);
    this.addEntity(wall2);
  }

  /**
   * Detect intersection two ractangles.
   * @param {Position} r1P1 top-left position of r1 rectangle.
   * @param {Position} r1P2 bottom-right position of r1 rectangle.
   * @param {Position} r2P1 top-left position of r2 rectangle.
   * @param {Position} r2P2 bottom-right position of r2 rectangle.
   */
  private isIntersectionRectangles(r1P1: Position, r1P2: Position, r2P1: Position, r2P2: Position): boolean {
    const leftX = Math.max(r1P1.x, r2P1.x);
    const rightX = Math.min(r1P2.x, r2P2.x);
    const topY = Math.max(r1P1.y, r2P1.y);
    const bottomY = Math.min(r1P2.y, r2P2.y);

    return leftX < rightX && topY < bottomY
  }

  private isIntersectionWithMapEntity(
    mapEntityPosition: Position,
    entityP1: Position,
    entityP2: Position,
  ): boolean {
    const mapEntity = this._mapEntities.get(mapEntityPosition) as MapEntityType;
    const { position: mapEntityP1, size: mapEntitySize } = mapEntity;

    const mapEntityP2 = {
      x: mapEntityP1.x + mapEntitySize.width,
      y: mapEntityP1.y + mapEntitySize.height,
    }

    return this.isIntersectionRectangles(mapEntityP1, mapEntityP2, entityP1, entityP2);
  }

  public getCollisions(p1: Position, p2: Position): Array<MapEntityType> {
    const yDelta = wall.size.height;
    const yStart = p1.y - yDelta;
    const yFinish = p1.y + yDelta;

    const xDelta = wall.size.width;
    const xStart = p1.x - xDelta;
    const xFinish = p1.x + xDelta;

    let collectionPositionsByY: Array<Position | never> = [];
    for (let y = yStart; y < yFinish; y++) {
      const testPositionY = this.positions.filter(p => p.y === y);
      if (testPositionY) {
        collectionPositionsByY = [...collectionPositionsByY, ...testPositionY];
      }
    }

    let collectionPositionsByX: Array<Position | never> = [];
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
    ) as MapEntityType[];
  }

  public get entities(): IterableIterator<MapEntityType> {
    return this._mapEntities.values();
  }

  public getMapEntityByPosition(position: Position): MapEntityType | undefined {
    return Mapper.instance._mapEntities.get(position);
  }

  public get positions(): Array<Position> {
    return [...Mapper.instance._mapEntities.keys()];
  }

  public addEntity(mapEntity: MapEntityType): MapEntityType {
    Mapper.instance._mapEntities.set(mapEntity.position, mapEntity);

    return mapEntity;
  }

  public removeEntityByPosition(position: Position): void {
    Mapper.instance._mapEntities.delete(position);
  }

  public render(): void {
    Render.renderMap(this);
  }
}
