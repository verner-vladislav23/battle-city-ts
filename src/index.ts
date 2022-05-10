import MapLayerCtx from './dom/layers/Map/MapLayerCtx';
import MotionLayerCtx from './dom/layers/Motion/MotionLayerCtx';

window.addEventListener('load', initCanvas);

function initCanvas() {
  new MotionLayerCtx();
  new MapLayerCtx();
}
