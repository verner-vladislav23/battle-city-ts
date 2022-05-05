import { ITank } from '../../models/Tank/interface';

const KEYBOARD_ARROW_KEY = {
  RIGHT: 'ArrowRight',
  LEFT: 'ArrowLeft',
  DOWN: 'ArrowDown',
  UP: 'ArrowUp',
};

export function keyDownEvent<Model extends ITank>(
  event: KeyboardEvent,
  ctx: Readonly<CanvasRenderingContext2D>,
  model: Model,
) {
  switch (event.key) {
    case KEYBOARD_ARROW_KEY.RIGHT: {
      // TODO: add rerender methods
      ctx.clearRect(
        model.position.x,
        model.position.y,
        model.height,
        model.width,
      );
      model.moveRight();
      ctx.fillRect(
        model.position.x,
        model.position.y,
        model.height,
        model.width,
      );
      break;
    }
    case KEYBOARD_ARROW_KEY.LEFT: {
      ctx.clearRect(
        model.position.x,
        model.position.y,
        model.height,
        model.width,
      );
      model.moveLeft();
      ctx.fillRect(
        model.position.x,
        model.position.y,
        model.height,
        model.width,
      );
      break;
    }
    case KEYBOARD_ARROW_KEY.UP: {
      ctx.clearRect(
        model.position.x,
        model.position.y,
        model.height,
        model.width,
      );
      model.moveUp();
      ctx.fillRect(
        model.position.x,
        model.position.y,
        model.height,
        model.width,
      );
      break;
    }
    case KEYBOARD_ARROW_KEY.DOWN: {
      ctx.clearRect(
        model.position.x,
        model.position.y,
        model.height,
        model.width,
      );
      model.moveDown();
      ctx.fillRect(
        model.position.x,
        model.position.y,
        model.height,
        model.width,
      );
      break;
    }
  }
}
