console.log("inside pub cart js");

addEventListener("DOMContentLoaded", async (e) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart = cart.map((index) => {
    return JSON.parse(index);
  });
  for (let product of cart) {
    const items = document.querySelector(".cart-items");
    const response = await fetch(`/api/products/${product.id}`);
    const data = await response.json();
    console.log(data);
    // const productDiv = document.createElement("div");
    // productDiv.innerText = data.name;
    // items.appendChild(productDiv);
  }
});
