import { MAX_MAP_ENTITY_SIZE } from '../MapEntity/constants';
import { IMap } from './interface';
import { Position } from '../../types/position';
import { IMapEntity } from '../MapEntity/interface';
import { DynamicMapEntityID } from '../MapEntity/types';
import { isStaticMapEntity } from '../../dom/layers/Motion/utils';

const Y_DELTA = MAX_MAP_ENTITY_SIZE.height;
const X_DELTA = MAX_MAP_ENTITY_SIZE.width;

export default class MapCollisions {
  private map: IMap;
  private readonly _entityID: DynamicMapEntityID | undefined;

  constructor(map: IMap, entityID?: DynamicMapEntityID) {
    this.map = map;
    this._entityID = entityID;
  }

  /**
   * Detect intersection two rectangles.
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
    const mapEntity = this.map.getMapEntityByPosition(
      mapEntityPosition,
    ) as IMapEntity;

    if (!isStaticMapEntity(mapEntity) && mapEntity.id === this._entityID) {
      return false;
    }

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
    const yStart = p1.y - Y_DELTA;
    const yFinish = p1.y + Y_DELTA;

    const xStart = p1.x - X_DELTA;
    const xFinish = p1.x + X_DELTA;

    const filteredByX = this.map.positions.filter(
      position => position.x > xStart && position.x < xFinish,
    );

    if (filteredByX.length === 0) {
      return [];
    }

    let collectionPositionsByY: Array<Position | never> = [];

    for (let y = yStart; y < yFinish; y++) {
      const testPositionY = filteredByX.filter(
        mapEntityPosition => mapEntityPosition.y === y,
      );

      if (testPositionY.length !== 0) {
        collectionPositionsByY = [...collectionPositionsByY, ...testPositionY];
      }
    }

    if (collectionPositionsByY.length === 0) {
      return [];
    }

    let collectionPositionsByX: Array<Position | never> = [];

    for (let x = xStart; x < xFinish; x++) {
      const testPositionX = collectionPositionsByY.filter(p => {
        return p.x === x && p.y > yStart && p.y < yFinish;
      });

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

    if (intersectedPositions.length === 0) {
      return [];
    }

    return intersectedPositions.map(position =>
      this.map.getMapEntityByPosition(position),
    ) as IMapEntity[];
  }
}
