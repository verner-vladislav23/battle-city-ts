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
      if (ctx.canvas.width <= model.position.x + model.width) break;
      model.moveRight();
      model.render();
      break;
    }
    case KEYBOARD_ARROW_KEY.LEFT: {
      if (0 >= model.position.x) break;
      model.moveLeft();
      model.render();
      break;
    }
    case KEYBOARD_ARROW_KEY.UP: {
      if (0 >= model.position.y) break;
      model.moveUp();
      model.render();
      break;
    }
    case KEYBOARD_ARROW_KEY.DOWN: {
      if (ctx.canvas.height <= model.position.y + model.height) break;
      model.moveDown();
      model.render();
      break;
    }
  }
}
