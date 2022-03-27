console.log("inside pub cart js");

addEventListener("DOMContentLoaded", async (e) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart = cart.map((index) => {
    return JSON.parse(index);
  });
  for (let product of cart) {
    const cartItems = document.querySelector(".cart-items");
    const response = await fetch(`/api/products/${product.id}`);
    const data = await response.json();
    console.log(data);
    // Create div for the item
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    cartItems.appendChild(itemDiv);
    // add image div
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("item-img");
    itemDiv.appendChild(imgDiv);
    // bring in image element
    const img = document.createElement("img");
    img.setAttribute("src", `${data.imgurl}`);
    imgDiv.appendChild(img);
  }
});
