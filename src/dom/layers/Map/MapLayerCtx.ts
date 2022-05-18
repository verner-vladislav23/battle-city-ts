import BaseLayerCtx from '../Base/BaseLayerCtx';
import { InitialSettings } from '../../../types/layer';

const LAYER_NODE_ID = 'map-layer';
const INITIAL_SETTINGS: InitialSettings = {
  nodeId: LAYER_NODE_ID,
  zIndex: '5',
  autofocus: false,
};

export default class MapLayerCtx extends BaseLayerCtx {
  constructor() {
    super(INITIAL_SETTINGS);
  }

  static get node() {
    return BaseLayerCtx.getNode(LAYER_NODE_ID);
  }

  static get ctx() {
    return BaseLayerCtx.getCtx(LAYER_NODE_ID);
  }
}
