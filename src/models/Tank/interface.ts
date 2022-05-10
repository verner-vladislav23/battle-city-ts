import { IMotion } from '../Motion/interface';
import { TankDirection } from './types';

export interface ITank extends IMotion {
  direction: TankDirection;
  render(): void;
  shot(): void;
}
