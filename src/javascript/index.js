import products from "./products.js";

let productsData = products;
let categories = ["All"];
let prices = [50, 100, 150, 200, 250, 300, 350, 400];
let defaultCate = "All";
let defaultPrice = 0;

const priceContainer = document.getElementById("filter-price-container");
const showPriceFilter = () => {
  let priceList = "";
  prices.forEach((price) => {
    priceList += `
      <label
        onclick="filterByPrice(${price})"
        for="price"
        class="price-filter flex items-center justify-center p-1 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
      >
        <input type="checkbox" class="hidden" />
        <span class="text-gray-700">${price}</span>
      </label>
    `;
  });
  priceContainer.innerHTML = priceList;
  const filterPrice = document.querySelectorAll(".price-filter");
  filterPrice.forEach((p) => {
    p.addEventListener("click", () => {
      filterPrice.forEach((fp) => {
        fp.classList.remove("border-blue-600");
      });
      p.classList.add("border-blue-600");
    });
  });
};
showPriceFilter();

const filterByPrice = (price) => {
  defaultPrice = price;
  const filteredProdoct = productsData.filter(
    (pro) =>
      pro.price >= defaultPrice &&
      (defaultCate != "All" ? pro.category === defaultCate : true)
  );
  renderProduct(filteredProdoct);
};
window.filterByPrice = filterByPrice;

const cateContainer = document.getElementById("category-container");
productsData.forEach((cate) => {
  if (!categories.includes(cate.category)) {
    categories.push(cate.category);
  }
});

const showFilterCategory = () => {
  let cateLists = "";
  categories.forEach((cate, index) => {
    cateLists += `
        <li onclick="filterByCategory('${cate}')" class="flex items-center">
          <label for="category-${index}" class="w-full flex items-center">
            <input
              type="radio"
              name="category"
              id="category-${index}"
              ${cate == "All" ? "checked" : ""}
              class="h-5 w-5 text-gray-600"
            />
            <label for="category-${index}" class="ml-2 text-gray-700">${cate}</label>
          </label>
        </li>
    `;
  });
  cateContainer.innerHTML = cateLists;
};
showFilterCategory();

const filterByCategory = (category) => {
  defaultCate = category;
  if (category === "All") {
    renderProduct(productsData);
  } else {
    const filteredProdoct = productsData.filter(
      (pro) =>
        pro.price >= defaultPrice &&
        (defaultCate != "All" ? pro.category === defaultCate : true)
    );
    renderProduct(filteredProdoct);
  }
};
window.filterByCategory = filterByCategory;

const productContainer = document.getElementById("product-card-container");
const search = document.getElementById("search");
const showMoreBtn = document.getElementById("show-more-btn");

search.addEventListener("input", () => {
  const searchProducts = productsData.filter((pro) =>
    pro.name.toLowerCase().includes(search.value.toLowerCase())
  );
  renderProduct(searchProducts);
});
let visibleCount = 8;

showMoreBtn.addEventListener("click", () => {
  visibleCount += 8;
  const filteredProdoct = productsData.filter(
    (pro) =>
      pro.price >= defaultPrice &&
      (defaultCate != "All" ? pro.category === defaultCate : true)
  );
  console.log(filteredProdoct);
  renderProduct(filteredProdoct);
});

const renderProduct = (filteredProdoct = products) => {
  let cards = "";
  filteredProdoct.slice(0, visibleCount).forEach((product) => {
    cards += `
        <div class="col-span-1">
            <div
              class="w-full aspect-square overflow-hidden rounded-lg border p-5"
            >
              <img
                class="w-full h-full object-cover"
                src="${product.image}"
                alt=""
              />
            </div>
            <a
              href="product-detail.html?id=${product.id}"
              class="block w-full truncate font-medium text-gray-700 text-lg mt-2"
            >
                ${product.name}
            </a>
            <p class="text-sm text-gray-500 truncate">
              ${product.description}
            </p>
            <span class="font-bold text-fuchsia-900 my-5">$${product.price}</span>
            <div class="grid grid-cols-6 gap-3 mt-2">
              <div class="col-span-4 flex items-center gap-2">
                <button
                  id="decrease"
                  class="h-full px-2 bg-gray-200 text-xl flex justify-center items-center text-gray-800 rounded-md hover:bg-gray-300 active:bg-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-dash"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  value="1"
                  id="quantity-${product.id}"
                  class="quantity w-16 h-full text-center border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  id="increase"
                  class="h-full px-2 bg-blue-500 text-xl flex justify-center items-center text-white rounded-md hover:bg-blue-600 active:bg-blue-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-plus"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
                    />
                  </svg>
                </button>
              </div>
              <button
                onclick="addToCart(${product.id})"
                class="col-span-2 w-full flex justify-center items-center py-2 text-sm bg-blue-600 transition-all rounded-md text-white hover:bg-blue-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-basket"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5"
                  />
                </svg>
              </button>
            </div>
        </div>
    `;
  });
  productContainer.innerHTML = cards;
  if (visibleCount >= filteredProdoct.length) {
    showMoreBtn.classList.add("hidden");
  } else {
    showMoreBtn.classList.remove("hidden");
  }

  const decreaseBtn = document.querySelectorAll("#decrease");
  const increaseBtn = document.querySelectorAll("#increase");
  const quantity = document.querySelectorAll(".quantity");

  increaseBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      quantity[index].value = parseInt(quantity[index].value) + 1;
    });
  });
  decreaseBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      quantity[index].value = parseInt(quantity[index].value) - 1;
      if (quantity[index].value < 1) {
        quantity[index].value = 1;
      }
    });
  });
};
renderProduct(productsData);

let carts = JSON.parse(localStorage.getItem("carts")) || [];
const itemCount = document.getElementById("item-count");
itemCount.innerHTML = carts.length;
const addToCart = (id) => {
  const qtyValue = document.getElementById(`quantity-${id}`);
  const product = productsData.find((pro) => pro.id === id);
  const newProductObj = { ...product, quantity: parseInt(qtyValue.value) };
  const checkIfExist = carts.find((item) => item.id === product.id);

  if (checkIfExist) {
    const productAfterUpdateQty = carts.map((product) =>
      product.id === id
        ? { ...product, quantity: product.quantity + parseInt(qtyValue.value) }
        : product
    );
    carts = productAfterUpdateQty;
    localStorage.setItem("carts", JSON.stringify(carts));
  } else {
    const newCartArr = [...carts, newProductObj];
    carts = newCartArr;
    localStorage.setItem("carts", JSON.stringify(carts));
  }
  renderCartItem();
  itemCount.innerHTML = carts.length;
};
window.addToCart = addToCart;

const cartItemContainer = document.getElementById("cart-item-container");
const totalAmount = document.getElementById("total-amount");
const renderCartItem = () => {
  let itemList = "";
  carts.forEach((product) => {
    itemList += `
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-5">
            <img
              src="${product.image}"
              class="w-14 h-14 border rounded-lg"
              alt=""
            />
            <div class="">
              <p class="w-40 text-left font-medium truncate">
                ${product.name}
              </p>
              <p class="w-40 truncate text-sm text-gray-500">
                ${product.description}
              </p>
            </div>
          </div>
          <span class="text-gray-600 font-medium">$${product.price}</span>
          <span>${product.quantity}</span>
          <div
            onclick="removeCartItem('${product.id}')"
            class="text-white bg-red-600 py-1 px-4 rounded cursor-pointer"
          >
            Remove
          </div>
        </div>
    `;
  });
  cartItemContainer.innerHTML = itemList;

  const total = carts.reduce((prev, curr) => {
    return curr.price * curr.quantity + prev;
  }, 0);
  totalAmount.innerHTML = `$${total.toFixed(2)}`;
};
renderCartItem();

const removeCartItem = (id) => {
  const newCartItems = carts.filter((item) => item.id != id);
  carts = newCartItems;
  localStorage.setItem("carts", JSON.stringify(carts));
  renderCartItem();
};
window.removeCartItem = removeCartItem;
