import { Position } from '../../types/position';
import { Size } from '../../types/size';

type BaseMapEntityProperties = {
  destructible: boolean;
  surmountable: boolean;
  position: Position;
  size: Size;
};

type Wall = {
  type: 'wall';
  destructible: true,
  surmountable: false,
} & BaseMapEntityProperties;

export type Box = {
  type: 'box';
} & BaseMapEntityProperties;

export type MapEntityType = Wall | Box;

export interface IMapEntity {
  create: () => void;
  destroy: () => void;
}

export type MapModel<TEntity extends MapEntityType> = TEntity & IMapEntity;