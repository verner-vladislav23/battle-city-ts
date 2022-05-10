import MapLayer from './dom/layers/Map/MapLayer';
import MotionLayer from './dom/layers/Motion/MotionLayer';

window.addEventListener('load', initCanvas);

function initCanvas() {
  const body = document.querySelector('body');
  new MotionLayer().mountTo(body).listenKeyboard();
  new MapLayer().mountTo(body);
}
