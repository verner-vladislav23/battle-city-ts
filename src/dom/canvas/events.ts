import { ITank } from '../../models/Tank/interface';

const KEYBOARD_ARROW_KEY = {
  RIGHT: 'ArrowRight',
  LEFT: 'ArrowLeft',
  DOWN: 'ArrowDown',
  UP: 'ArrowUp',
  SHOT: 'Space',
} as const;

const KEYBOARD_CODE = {
  SHOT: 'Space',
};

export function keyDownEvent<Model extends ITank>(
  event: KeyboardEvent,
  model: Model,
) {
  switch (event.key) {
    case KEYBOARD_ARROW_KEY.RIGHT: {
      model.moveRight();
      model.render();
      break;
    }
    case KEYBOARD_ARROW_KEY.LEFT: {
      model.moveLeft();
      model.render();
      break;
    }
    case KEYBOARD_ARROW_KEY.UP: {
      model.moveUp();
      model.render();
      break;
    }
    case KEYBOARD_ARROW_KEY.DOWN: {
      model.moveDown();
      model.render();
      break;
    }
  }

  switch (event.code) {
    case KEYBOARD_CODE.SHOT: {
      model.shot();
      break;
    }
  }
}
