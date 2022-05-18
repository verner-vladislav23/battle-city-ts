import { ITank } from '../../models/Tank/interface';

const KEYBOARD_ARROW_KEY = {
  RIGHT: 'ArrowRight',
  LEFT: 'ArrowLeft',
  DOWN: 'ArrowDown',
  UP: 'ArrowUp',
} as const;

const KEYBOARD_CODE = {
  SHOT: 'Space',
} as const;

export function keyDownEvent(event: KeyboardEvent, tank: ITank): void {
  switch (event.key) {
    case KEYBOARD_ARROW_KEY.RIGHT: {
      tank.moveRight();
      tank.render();
      break;
    }
    case KEYBOARD_ARROW_KEY.LEFT: {
      tank.moveLeft();
      tank.render();
      break;
    }
    case KEYBOARD_ARROW_KEY.UP: {
      tank.moveUp();
      tank.render();
      break;
    }
    case KEYBOARD_ARROW_KEY.DOWN: {
      tank.moveDown();
      tank.render();
      break;
    }
  }

  switch (event.code) {
    case KEYBOARD_CODE.SHOT: {
      tank.shot();
      break;
    }
  }
}
