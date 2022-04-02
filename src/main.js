const { ipcRenderer } = require("electron");
const products = document.querySelector("#products");
ipcRenderer.on("product:new", (e, product) => {
  const newProduct = `
  <div class="col-xs-4 p-2">
    <div class="card text-center">
        <div class="card-header">${product.name}</div>
        <div class="card-body">${product.desc}<hr/>${product.price}</div>
        <div class="card-footer">
        <button>Remove</button>
        </div>
    </div>
  </div>
  `;
  products.innerHTML += newProduct;
  const btns = document.querySelectorAll("button");
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.parentElement.remove();
    });
  });
});

ipcRenderer.on("product:remove-all", (e) => {
  products.innerHTML = "";
});
