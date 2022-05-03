window.addEventListener("load", initCanvas);

function initCanvas() {
  const body = document.querySelector("body");
  const canvas = document.createElement("canvas");

  canvas.style.display = "block";
  canvas.style.marginLeft = "auto";
  canvas.style.marginRight = "auto";
  canvas.style.marginTop = "50px";
  canvas.style.border = "1px solid black";
  canvas.height = 500;
  canvas.width = 800;

  body?.appendChild(canvas);
}