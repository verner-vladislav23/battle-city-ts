export const BULLET_HEIGHT = 10;
export const BULLET_WIDTH = 10;
export const BULLET_STEP = 5;

export const BULLET_MAP_ENTITY_PROPS = {
  isStatic: false,
  type: 'bullet',
  size: {
    width: BULLET_WIDTH,
    height: BULLET_HEIGHT,
  },
  step: BULLET_STEP,
  surmountable: false,
  destructible: true,
} as const;
