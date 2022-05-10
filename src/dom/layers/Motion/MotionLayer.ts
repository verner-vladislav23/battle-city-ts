import { InitialSettings } from '../../../types/layer';
import BaseLayer from '../Base/BaseLayer';
import Tank from '../../../models/Tank/Tank';
import { keyDownEvent } from '../../canvas/events';
import { ITank } from '../../../models/Tank/interface';

const LAYER_NODE_ID = 'motion-layer';
const INITIAL_SETTINGS: InitialSettings = {
  nodeId: LAYER_NODE_ID,
  zIndex: '3',
  autofocus: true,
};

export default class MotionLayer extends BaseLayer {

  constructor() {
    super(INITIAL_SETTINGS);
  }

  public listenKeyboard(): void {
    const tank = new Tank({ x: 10, y: 10 });
    tank.render();

    this.node.addEventListener('keydown', event =>
      keyDownEvent<ITank>(event, tank),
    );
  }

  static get node() {
    return BaseLayer.getNode(LAYER_NODE_ID);
  }

  static get ctx() {
    return BaseLayer.getCtx(LAYER_NODE_ID);
  }
}
