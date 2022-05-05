import { Position } from './types';
import { ITank } from './interface';

const TANK_HEIGHT = 50;
const TANK_WITH = 50;
const STEP = 20;

export default class Tank implements ITank {
  public height: number;
  public width: number;

  constructor(public position: Position) {
    this.position = position;
    this.height = TANK_HEIGHT;
    this.width = TANK_WITH;
  }

  public moveRight(): void {
    this.position = { ...this.position, x: this.position.x + STEP };
  }

  public moveLeft(): void {
    this.position = { ...this.position, x: this.position.x - STEP };
  }

  public moveUp(): void {
    this.position = { ...this.position, y: this.position.y - STEP };
  }

  public moveDown(): void {
    this.position = { ...this.position, y: this.position.y + STEP };
  }
}
