import { IMapEntity } from 'src/models/MapEntity/interface';
import { StaticMapEntityType } from '../../../models/MapEntity/types';
import StaticMapEntity from '../../../models/MapEntity/MapEntity';

export function isStaticMapEntity(
  mapEntity: IMapEntity,
): mapEntity is StaticMapEntity<StaticMapEntityType> {
  return mapEntity instanceof StaticMapEntity && mapEntity.isStatic;
}
