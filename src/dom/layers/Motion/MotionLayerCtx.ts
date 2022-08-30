import { InitialSettings } from 'src/types/layer';
import BaseLayerCtx from '../Base/BaseLayerCtx';
import Map from 'src/models/Map/Map';
import Tank from 'src/models/Tank/Tank';
import TankBot from 'src/models/TankBot/TankBot';

import { keyDownEvent } from '../../canvas/events';

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
    const map = Map.getMap();
    const tank = new Tank({ x: 100, y: 400 });

    map.generateMap();
    map.render();

    tank.render();

    new TankBot({ x: 400, y: 400 });

    this.node.addEventListener('keydown', event => keyDownEvent(event, tank));
  }

  static get node() {
    return BaseLayerCtx.getNode(LAYER_NODE_ID);
  }

  static get ctx() {
    return BaseLayerCtx.getCtx(LAYER_NODE_ID);
  }
}
