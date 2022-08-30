import Render from 'src/dom/canvas/renders';
import { IMap } from './interface';
import MapCollisions from './MapCollisions';
import { Position } from '../../types/position';
import { IMapEntity } from '../MapEntity/interface';
import { DynamicMapEntityID } from '../MapEntity/types';

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

  public getCollisions(
    p1: Position,
    p2: Position,
    ownerID: DynamicMapEntityID,
  ): Array<IMapEntity> {
    const mapCollisions = new MapCollisions(this, ownerID);

    return mapCollisions.getCollisions(p1, p2);
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

  public removeEntity(position: Position): void {
    Mapper.instance._mapEntities.delete(position);
  }

  public render(): void {
    Render.renderMap(this);
  }
}
