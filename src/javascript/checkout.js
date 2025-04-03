let carts = JSON.parse(localStorage.getItem("carts")) || [];

const cartItemContainer = document.getElementById("cart-items-container");
const itemsQuantity = document.getElementById("item-quantity");
const orderTotal = document.getElementById("order-total");

const orderSumary = () => {
  let totalQty = carts.reduce((prev, curr) => {
    return curr.quantity + prev;
  }, 0);
  const total = carts.reduce((prev, curr) => {
    return curr.price * curr.quantity + prev;
  }, 0);

  itemsQuantity.innerHTML = `${totalQty} Items`;
  orderTotal.innerHTML = `$${total.toFixed(2)}`;
};
orderSumary();

const renderCartItem = () => {
  let listItem = "";
  carts.forEach((item) => {
    listItem += `
        <div class="grid grid-cols-12 py-4 items-center border-b-2">
            <div class="col-span-5 text-gray-700 flex gap-4">
                <img
                class="w-20 border aspect-square object-cover p-1 rounded-md"
                src="${item.image}"
                alt="Product Image"
                />
                <div class="">
                <h2 class="w-[220px] truncate font-medium">
                    ${item.name}
                </h2>
                <span class="font-medium text-gray-800"
                    >Category :
                    <span class="text-gray-600">${item.category}</span></span
                >
                <br />
                <span class="font-medium text-gray-800"
                    >Price : <span class="text-gray-600">$${
                      item.price
                    }</span></span
                >
                </div>
            </div>
            <div class="col-span-3 text-gray-700">
                <div
                class="inline space-x-2 border border-gray-300 rounded-full px-4 py-1 shadow-sm"
                >
                <button
                    onclick="decrement(${item.id})"
                    class="text-lg font-medium px-1 text-gray-700 hover:text-red-500"
                >
                    -
                </button>
                <span class="text-lg font-medium">${item.quantity}</span>
                <button
                    onclick="increment(${item.id})"
                    class="text-lg font-medium px-1 text-gray-700 hover:text-green-500"
                >
                    +
                </button>
                </div>
            </div>
            <div class="col-span-3 text-gray-700 font-bold">$${(
              item.quantity * item.price
            ).toFixed(2)}</div>
            <div class="col-span-1 text-gray-700">
                <button onclick="removeCartItem(${
                  item.id
                })" class="hover:text-red-500">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                    />
                </svg>
                </button>
            </div>
        </div>
    `;
  });
  cartItemContainer.innerHTML = listItem;
};
renderCartItem();

const removeCartItem = (id) => {
  carts = carts.filter((product) => product.id != id);
  localStorage.setItem("carts", JSON.stringify(carts));
  renderCartItem();
  orderSumary();
};

const increment = (id) => {
  carts = carts.map((product) =>
    product.id == id ? { ...product, quantity: product.quantity + 1 } : product
  );
  localStorage.setItem("carts", JSON.stringify(carts));
  renderCartItem();
  orderSumary();
};

const decrement = (id) => {
  const product = carts.find((item) => item.id == id);

  if (product.quantity <= 1) {
    removeCartItem(id);
  } else {
    carts = carts.map((product) =>
      product.id == id
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    localStorage.setItem("carts", JSON.stringify(carts));
  }
  renderCartItem();
  orderSumary();
};

const checkout = () => {
  if (carts.length == 0) {
    Swal.fire({
      icon: "error",
      title: "Your cart is empty",
      text: "Your cart is empty, you can't order",
      footer: '<a href="index.html">Go buy something.</a>',
    });
  } else {
    Swal.fire({
      title: "Order Successfulyy",
      icon: "success",
      draggable: true,
    });
  }
  carts = [];
  localStorage.setItem("carts", JSON.stringify(carts));
  renderCartItem();
  orderSumary();
};

document.getElementById("checkout-btn").addEventListener("click", checkout);
