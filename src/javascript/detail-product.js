import products from "./products.js";

let productData = products;
let carts = JSON.parse(localStorage.getItem("carts")) || [];

const urlParam = new URLSearchParams(window.location.search);
const productId = urlParam.get("id");

const product = productData.find((pro) => pro.id === parseInt(productId));

const detailContainer = document.getElementById("detail-container");
detailContainer.innerHTML = `
    <div class="max-w-[1250px] mx-auto p-8 flex gap-20">
        <!-- Left Section (Image & Thumbnails) -->
        <div class="sticky top-0 w-[555px] h-[555px] bg-black">
          <img
            src="${product.image}"
            alt="Watch"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Right Section (Details & Purchase) -->
        <div class="md:w-1/2">
          <h1 class="text-4xl font-bold">${product.name}</h1>
          <p class="text-gray-500 text-sm mt-2">${product.category}</p>
          <p class="text-gray-700 mt-3">
            ${product.description}
          </p>

          <div class="mt-6 text-lg space-y-2" id="product-detail">
            
          </div>

          <div class="mt-6 text-3xl font-bold">$${product.price}</div>
          <button
            onclick="addToCart()"
            class="mt-6 bg-black text-white px-6 py-3 rounded-lg w-full hover:bg-gray-900"
          >
            Add to Cart
          </button>
        </div>
    </div>
`;

const productDetail = document.getElementById("product-detail");

let detailHTML = "";
for (let key in product.details) {
  if (Array.isArray(product.details[key])) {
    detailHTML += `<p><strong>${key}:</strong></p>`;
    for (let pro of product.details[key]) {
      detailHTML += `<li class="ml-16">${pro}</li>`;
    }
  } else {
    detailHTML += `<p><strong>${key}:</strong> ${product.details[key]}</p>`;
  }
}
productDetail.innerHTML += detailHTML;

const addToCart = () => {
  const existProduct = carts.find((item) => item.id == product.id);

  if (existProduct) {
    const productAfterUpdateQty = carts.map((product) =>
      product.id === product.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    carts = productAfterUpdateQty;
    localStorage.setItem("carts", JSON.stringify(carts));
  } else {
    const newCartArr = [...carts, { ...product, quantity: 1 }];
    carts = newCartArr;
    localStorage.setItem("carts", JSON.stringify(carts));
  }
};
window.addToCart = addToCart;
