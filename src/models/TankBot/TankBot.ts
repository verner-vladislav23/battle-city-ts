import { Position } from 'src/types/position';
import Tank from '../Tank/Tank';
import { getRandomInt } from 'src/utils';

export default class TankBot extends Tank {
  private readonly _intervalID: number;
  constructor(position: Position) {
    super(position);

    this._intervalID = window.setInterval(() => {
      this.randomMove();
      this.shot();
      this.render();
    }, 500);
  }

  private randomMove(): void {
    const randomIndexMove = getRandomInt(0, 4);

    const moves = [
      this.moveRight.bind(this),
      this.moveLeft.bind(this),
      this.moveUp.bind(this),
      this.moveDown.bind(this),
    ];

    moves[randomIndexMove]();
  }

  public destroy() {
    super.destroy();
    window.clearInterval(this._intervalID);
  }
}
