import BaseLayerCtx from '../Base/BaseLayerCtx';
import Map from '../../../models/Map/Map';
import { InitialSettings } from '../../../types/layer';

const LAYER_NODE_ID = 'map-layer';
const INITIAL_SETTINGS: InitialSettings = {
  nodeId: LAYER_NODE_ID,
  zIndex: '5',
  autofocus: false,
};

export default class MapLayerCtx extends BaseLayerCtx {
  private map: Map;

  constructor() {
    super(INITIAL_SETTINGS);
    this.map = new Map();
    this.renderMap();
  }

  private renderMap() {
    for (const mapEntity of this.map.entities) {
      const { position, size } = mapEntity;
      this.ctx.fillRect(position.x, position.y, size.width, size.height);
    }
  }

  static get node() {
    return BaseLayerCtx.getNode(LAYER_NODE_ID);
  }

  static get ctx() {
    return BaseLayerCtx.getCtx(LAYER_NODE_ID);
  }
}
