export const BULLET_GENERATE_TIMOUT = 1000;
export const TANK_HEIGHT = 50;
export const TANK_WIDTH = 50;
export const TANK_STEP = 10;
export const TANK_DIRECTION = {
  UP: 'UP',
  RIGHT: 'RIGHT',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
} as const;
export const INITIAL_TANK_DIRECTION = TANK_DIRECTION.UP;
