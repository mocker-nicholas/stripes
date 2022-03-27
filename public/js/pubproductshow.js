console.log("Inside Public Product Show");

const addToCartBtn = document.getElementById("addToCart");

addToCartBtn.addEventListener("mouseover", () => {
  if (JSON.parse(localStorage.getItem("cart")) === null) {
    localStorage.setItem("cart", "[]");
  }
});

addToCartBtn.addEventListener("click", (e) => {
  const messageDiv = document.getElementById("addedMsg");
  const cart = JSON.parse(localStorage.getItem("cart"));
  const name = productName;
  const size = document.querySelector("#size").value;
  const id = productId;
  const price = productPrice;
  const newItem = JSON.stringify({
    name: name,
    size: size,
    id: id,
    price: parseInt(price).toFixed(2),
  });
  messageDiv.classList.add("hide");
  cart.push(newItem);
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
  messageDiv.innerText = `${name} has been added to cart`;
  messageDiv.classList.toggle("hide");
});
