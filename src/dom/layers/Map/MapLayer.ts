import BaseLayer from '../Base/BaseLayer';
import Map from '../../../models/Map/Map';
import { InitialSettings } from '../../../types/layer';

const LAYER_NODE_ID = 'map-layer';
const INITIAL_SETTINGS: InitialSettings = {
  nodeId: LAYER_NODE_ID,
  zIndex: '5',
  autofocus: false,
};

export default class MapLayer extends BaseLayer {
  private _map: Map | null;

  constructor() {
    super(INITIAL_SETTINGS);
    this._map = new Map();
    this.renderMap();
  }

  private renderMap() {
    if (this._map?.mapEntities) {
      for (let i = 0; i < (this._map?.mapEntities?.length ?? 0); i++) {
        const { position, size } = this._map?.mapEntities[i];
        this.ctx.fillRect(position.x, position.y, size.width, size.height);
      }
    }
  }

  static get node() {
    return BaseLayer.getNode(LAYER_NODE_ID);
  }

  static get ctx() {
    return BaseLayer.getCtx(LAYER_NODE_ID);
  }
}
