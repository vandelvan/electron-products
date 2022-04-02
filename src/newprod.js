const { ipcRenderer } = require("electron");
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  const name = document.querySelector("#name").value;
  const price = document.querySelector("#price").value;
  const desc = document.querySelector("#desc").value;
  const newProduct = {
    name: name,
    price: price,
    desc: desc,
  };
  ipcRenderer.send("product:new", newProduct);
  e.preventDefault();
});
