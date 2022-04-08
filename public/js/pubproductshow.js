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
  const imgurl = prodImgurl;
  // using JSON.stringify on the ejs variable leaves you with the HTML special entity for the " characters. Parse those out before storing them in your cart
  const description = prodDescription.replaceAll("&#34;", "");
  const newItem = {
    name: name,
    size: size,
    id: id,
    price: price,
    imgurl: imgurl,
    description: description,
  };
  messageDiv.classList.add("hide");
  cart.push(newItem);
  localStorage.setItem("cart", JSON.stringify(cart));
  messageDiv.innerText = `${name} has been added to cart`;
  messageDiv.classList.toggle("hide");
});
