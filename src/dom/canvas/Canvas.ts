type InitialSettings = Readonly<{
  width: number;
  height: number
}>

const CANVAS_NODE_ID = "canvas";
const CANVAS_CONTEXT_ID = "2d";
const CANVAS_TAG_NAME = "canvas";

export default class Canvas {
  private _ctx: CanvasRenderingContext2D | null;
  private _node: HTMLCanvasElement | null;

  constructor(private initialSettings: InitialSettings) {
    this.initialSettings = initialSettings;
    this._ctx = null;
    this._node = null;

    this.init();
  }

  private init() {
    const canvas = document.createElement(CANVAS_TAG_NAME);
    const canvasContext = canvas.getContext(CANVAS_CONTEXT_ID);

    canvas.style.display = "block";
    canvas.style.marginLeft = "auto";
    canvas.style.marginRight = "auto";
    canvas.style.marginTop = "50px";
    canvas.style.border = "1px solid black";
    canvas.height = 500;
    canvas.width = 800;
    canvas.id = CANVAS_NODE_ID;

    this._ctx = canvasContext;
    this._node = canvas;
  }

  public get getCtx(): CanvasRenderingContext2D {
    return this._ctx as CanvasRenderingContext2D;
  }

  static get node(): HTMLCanvasElement {
    const node = document.getElementById(CANVAS_NODE_ID) as HTMLCanvasElement | null;

    if (node === null) {
      throw new Error(`We couldn't get canvas node by ${CANVAS_NODE_ID}`);
    }

    return node;
  }

  static get ctx(): CanvasRenderingContext2D {
    const ctx = Canvas.node.getContext(CANVAS_CONTEXT_ID);
    if (ctx === null) {
      throw new Error("We couldn't get context")
    }

    return ctx;
  }

  public get node(): HTMLCanvasElement {
    return this._node as HTMLCanvasElement;
  }
}