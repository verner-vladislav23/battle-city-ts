import StaticMapEntity from './MapEntity';
import DynamicMapEntity from './DynamicMapEntity/DynamicMapEntity';
import { StaticMapEntityType, DynamicMapEntityType } from './types';

export type IMapEntity =
  | StaticMapEntity<StaticMapEntityType>
  | DynamicMapEntity<DynamicMapEntityType>;
