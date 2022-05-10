import { ITank } from '../../models/Tank/interface';

const KEYBOARD_ARROW_KEY = {
  RIGHT: 'ArrowRight',
  LEFT: 'ArrowLeft',
  DOWN: 'ArrowDown',
  UP: 'ArrowUp',
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
}
