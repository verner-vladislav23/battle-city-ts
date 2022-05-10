import { IMotion } from '../Motion/interface';

export interface IBullet extends IMotion {
  render(): void;
  // start(): void;
}
