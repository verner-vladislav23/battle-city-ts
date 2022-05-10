import { Position } from '../../types/position';
import { ITank } from './interface';
import Iterable from '../Iterable/Iterable';
import { Render } from '../../dom/canvas/renders';

const TANK_HEIGHT = 50;
const TANK_WIDTH = 50;
const STEP = 10;

export default class Tank extends Iterable implements ITank {
  constructor(public position: Position) {
    super(position, TANK_HEIGHT, TANK_WIDTH, STEP);
  }

  render(): void {
    Render.renderTank(this);
  }
}
