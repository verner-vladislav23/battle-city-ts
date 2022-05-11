export const TANK_HEIGHT = 50;
export const TANK_WIDTH = 50;
export const TANK_STEP = 30;
export const TANK_DIRECTION = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
} as const;
export const INITIAL_TANK_DIRECTION = TANK_DIRECTION.DOWN;
