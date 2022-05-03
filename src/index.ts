window.addEventListener("load", () => {
  console.log('HELLO TANKS');
  const header = document.createElement("h1");
  header.innerText = "Hello Tanks"

  const body = document.querySelector("body");
  body?.appendChild(header);
})