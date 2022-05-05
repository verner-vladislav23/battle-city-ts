import Canvas from './dom/canvas/Canvas';

window.addEventListener('load', initCanvas);

function initCanvas() {
  const body = document.querySelector('body');

  const canvas = new Canvas({
    width: 800,
    height: 500,
  });

  body?.appendChild(canvas.node);
}
