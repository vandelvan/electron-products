const { ipcRenderer } = require("electron");
const products = document.querySelector("#products");
const defaultText = `
<p class="text-gray-500 text-center">
  To start using this app, press Ctrl+N or click on the menu File->New
  Product, after adding a product you'll see it on the main window
</p>
`;
products.innerHTML = defaultText;
let zeroProds = true;
ipcRenderer.on("product:new", (e, product) => {
  if (zeroProds) {
    products.innerHTML = "";
    zeroProds = false;
  }
  const newProduct = `
    <div class="block rounded-lg shadow-lg bg-white max-w-sm text-center">
      <div class="py-3 px-6 border-b border-gray-300">${product.name}</div>
      <div class="p-6">
        <h5 class="text-gray-900 text-xl font-medium mb-2">
        $ ${product.price}
        </h5>
        <p class="text-gray-700 text-base mb-4">
        ${product.desc}
        </p>
      </div>
      <div class="py-3 px-6 border-t border-gray-300 text-gray-600">
        <button
          type="button"
          class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Remove
        </button>
      </div>
    </div>
  `;
  products.innerHTML += newProduct;
  const btns = document.querySelectorAll("button");
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.remove();
    });
  });
});

ipcRenderer.on("product:remove-all", (e) => {
  products.innerHTML = defaultText;
  zeroProds = true;
});
