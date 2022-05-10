export interface ILayer {
  _ctx: CanvasRenderingContext2D | null;
  _node: HTMLCanvasElement | null;
  init: () => void;
}
