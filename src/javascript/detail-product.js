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
          <div class="mt-2 flex items-center gap-1" id="rate-container">
          </div>
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
    const productAfterUpdateQty = carts.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
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
const rateContainer = document.getElementById("rate-container");

function renderStars(rate) {
  let rateOutput = "";
  let fullStars = Math.floor(rate); // Count of full stars
  let hasHalfStar = rate % 1 !== 0; // Check if there's a half-star
  let emptyStars = hasHalfStar ? 5 - fullStars - 1 : 5 - fullStars; // Remaining empty stars

  // Full Stars
  for (let i = 0; i < fullStars; i++) {
    rateOutput += `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellowgreen" class="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
    `;
  }

  // Half Star (if applicable)
  if (hasHalfStar) {
    rateOutput += `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellowgreen" class="bi bi-star-half" viewBox="0 0 16 16">
        <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z"/>
      </svg>
    `;
  }

  // Empty Stars
  for (let i = 0; i < emptyStars; i++) {
    rateOutput += `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-star" viewBox="0 0 16 16">
        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
      </svg>
    `;
  }

  rateContainer.innerHTML = rateOutput;
}
renderStars(product.rate);

