import { InitialSettings } from '../../../types/layer';
import BaseLayerCtx from '../Base/BaseLayerCtx';
import Tank from '../../../models/Tank/Tank';
import { keyDownEvent } from '../../canvas/events';
import { ITank } from '../../../models/Tank/interface';

const LAYER_NODE_ID = 'motion-layer';
const INITIAL_SETTINGS: InitialSettings = {
  nodeId: LAYER_NODE_ID,
  zIndex: '3',
  autofocus: true,
};

export default class MotionLayerCtx extends BaseLayerCtx {

  constructor() {
    super(INITIAL_SETTINGS);
    this.listenKeyboard();
  }

  private listenKeyboard(): void {
    const tank = new Tank({ x: 10, y: 10 });
    tank.render();

    this.node.addEventListener('keydown', event =>
      keyDownEvent<ITank>(event, tank),
    );
  }

  static get node() {
    return BaseLayerCtx.getNode(LAYER_NODE_ID);
  }

  static get ctx() {
    return BaseLayerCtx.getCtx(LAYER_NODE_ID);
  }
}
