import { InitialSettings } from '../../../types/layer';
import { LAYER_SIZE } from '../../../constants/layer';

const CANVAS_CONTEXT_ID = '2d';
const CANVAS_TAG_NAME = 'canvas';

export default class BaseLayerCtx {
  private _ctx: CanvasRenderingContext2D | null;
  private _node: HTMLCanvasElement | null;

  constructor(private initialSettings: InitialSettings) {
    this._ctx = null;
    this._node = null;

    this.init(initialSettings);
    this.mountTo();
  }

  protected init(initialSettings: InitialSettings) {
    const canvas = document.createElement(CANVAS_TAG_NAME);
    const canvasContext = canvas.getContext(CANVAS_CONTEXT_ID);

    canvas.style.position = 'absolute';
    canvas.style.display = 'block';
    canvas.style.marginLeft = '30%';
    canvas.style.marginTop = '50px';
    canvas.style.border = '1px solid black';
    canvas.style.zIndex = initialSettings.zIndex;
    canvas.height = LAYER_SIZE.height;
    canvas.width = LAYER_SIZE.width;
    canvas.tabIndex = 0;
    canvas.id = initialSettings.nodeId;
    canvas.autofocus = initialSettings.autofocus;

    this._ctx = canvasContext;
    this._node = canvas;
  }

  private mountTo() {
    const body = document.querySelector('body');
    body?.appendChild(this.node);
  }

  public get ctx(): Readonly<CanvasRenderingContext2D> {
    return this._ctx as CanvasRenderingContext2D;
  }

  static getNode(nodeId: string): HTMLCanvasElement {
    const node = document.getElementById(nodeId) as HTMLCanvasElement | null;

    if (node === null) {
      throw new Error(`We couldn't get canvas node by ${nodeId}`);
    }

    return node;
  }

  static getCtx(nodeId: string): CanvasRenderingContext2D {
    const ctx = BaseLayerCtx.getNode(nodeId).getContext(CANVAS_CONTEXT_ID);

    if (ctx === null) {
      throw new Error("We couldn't get context");
    }

    return ctx;
  }

  public get node(): HTMLCanvasElement {
    return this._node as HTMLCanvasElement;
  }
}
