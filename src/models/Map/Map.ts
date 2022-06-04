import { Render } from '../../dom/canvas/renders';
import { IMap } from './interface';
import { Position } from '../../types/position';
import { IMapEntity } from '../MapEntity/interface';
import { MapEntityType } from '../MapEntity/types';
import { MAX_MAP_ENTITY_SIZE } from '../MapEntity/constants';
import WallMapEntity from '../MapEntity/entities/WallMapEntity/WallMapEntity';
import BoxMapEntity from '../MapEntity/entities/BoxMapEntity/BoxMapEntity';
import WaterMapEntity from '../MapEntity/entities/WaterMapEntity/WaterMapEntity';
import ForestMapEntity from '../MapEntity/entities/ForestMapEntity/ForestMapEntity';

export default class Mapper implements IMap {
  private static instance: Mapper;
  private readonly _mapEntities: Map<Position, IMapEntity>;

  private constructor() {
    this._mapEntities = new Map<Position, IMapEntity>();
  }

  static getMap(): Mapper {
    if (!this.instance) {
      this.instance = new Mapper();
    }

    return this.instance;
  }

  public generateMap(): void {
    for (let y = 40; y < 200; y += 40) {
      const wallPosition = { x: 50, y };
      WallMapEntity.create(wallPosition);
    }
    for (let y = 40; y < 200; y += 40) {
      const wallPosition = { x: 200, y };
      WallMapEntity.create(wallPosition);
    }

    const boxPosition = { x: 150, y: 220 };
    BoxMapEntity.create(boxPosition);

    for (let y = 250; y < 400; y += 40) {
      const wallPosition = { x: 50, y };
      WallMapEntity.create(wallPosition);
    }

    for (let y = 250; y < 400; y += 40) {
      const wallPosition = { x: 200, y };
      WallMapEntity.create(wallPosition);
    }

    const waterPosition = { x: 400, y: 450 };
    WaterMapEntity.create(waterPosition);

    const forestPosition = { x: 350, y: 250 };
    ForestMapEntity.create(forestPosition);
  }

  /**
   * Detect intersection two ractangles.
   * @param {Position} r1P1 top-left position of r1 rectangle.
   * @param {Position} r1P2 bottom-right position of r1 rectangle.
   * @param {Position} r2P1 top-left position of r2 rectangle.
   * @param {Position} r2P2 bottom-right position of r2 rectangle.
   */
  private isIntersectionRectangles(
    r1P1: Position,
    r1P2: Position,
    r2P1: Position,
    r2P2: Position,
  ): boolean {
    const leftX = Math.max(r1P1.x, r2P1.x);
    const rightX = Math.min(r1P2.x, r2P2.x);
    const topY = Math.max(r1P1.y, r2P1.y);
    const bottomY = Math.min(r1P2.y, r2P2.y);

    return leftX < rightX && topY < bottomY;
  }

  private isIntersectionWithMapEntity(
    mapEntityPosition: Position,
    entityP1: Position,
    entityP2: Position,
  ): boolean {
    const mapEntity = this._mapEntities.get(mapEntityPosition) as IMapEntity;
    const { position: mapEntityP1, size: mapEntitySize } = mapEntity;

    const mapEntityP2 = {
      x: mapEntityP1.x + mapEntitySize.width,
      y: mapEntityP1.y + mapEntitySize.height,
    };

    return this.isIntersectionRectangles(
      mapEntityP1,
      mapEntityP2,
      entityP1,
      entityP2,
    );
  }

  public getCollisions(p1: Position, p2: Position): Array<IMapEntity> {
    const yDelta = MAX_MAP_ENTITY_SIZE.height;
    const yStart = p1.y - yDelta;
    const yFinish = p1.y + yDelta;

    const xDelta = MAX_MAP_ENTITY_SIZE.width;
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
    ) as IMapEntity[];
  }

  public get entities(): IterableIterator<IMapEntity> {
    return this._mapEntities.values();
  }

  public getMapEntityByPosition(position: Position): IMapEntity | undefined {
    return Mapper.instance._mapEntities.get(position);
  }

  public get positions(): Array<Position> {
    return [...Mapper.instance._mapEntities.keys()];
  }

  public addEntity(mapEntity: IMapEntity): IMapEntity {
    Mapper.instance._mapEntities.set(mapEntity.position, mapEntity);

    return mapEntity;
  }

  public removeEntity(mapEntity: MapEntityType | IMapEntity): void {
    Mapper.instance._mapEntities.delete(mapEntity.position);
  }

  public render(): void {
    Render.renderMap(this);
  }
}
