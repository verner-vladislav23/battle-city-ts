import { TANK_DIRECTION } from './constants';

export type TankDirectionKeys = keyof typeof TANK_DIRECTION;
export type TankDirection = typeof TANK_DIRECTION[TankDirectionKeys];