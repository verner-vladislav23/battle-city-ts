import { Position } from './types';
import { ITank } from './interface';
import Iterable from '../Iterable/Iterable';

const TANK_HEIGHT = 50;
const TANK_WITH = 50;
const STEP = 10;

export default class Tank extends Iterable implements ITank {
  constructor(public position: Position) {
    super(position, TANK_HEIGHT, TANK_WITH, STEP);
  }
}
