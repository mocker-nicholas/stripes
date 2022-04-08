addEventListener("DOMContentLoaded", async (e) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let prodArr = [];
  // Check to see if there are items in the cart
  if (cart) {
    cart = cart.map((index) => {
      return prodArr.push(index);
    });
  }

  // Generate the UI for the items in the cart if there are items, if not, show message and shop button
  let indexNum = -1;
  if (prodArr.length < 1) {
    const cartDisplay = document.querySelector("#cart-display");
    cartDisplay.classList.add("center-all");
    cartDisplay.setAttribute(
      "style",
      "background-image: url(../img/emptycart.svg); background-repeat: no-repeat; background-position: center; background-size: contain; margin: 1rem 0; position: relative;"
    );
    /// Bring in SVG for backround
    const checkOutInfo = document.querySelector(".cart-container");
    checkOutInfo.classList.add("hide");
    const nothingDiv = document.createElement("div");
    nothingDiv.textContent = "Nothing is in your cart!";
    nothingDiv.classList.add("nothing");
    cartDisplay.appendChild(nothingDiv);
    // add a shop button
    const shopBtn = document.createElement("a");
    shopBtn.classList.add("btn-dark", "cart-btn");
    shopBtn.innerText = "Go to Shop";
    shopBtn.setAttribute("href", "/products");
    cartDisplay.appendChild(shopBtn);
    return;
  }

  let checkoutPrice = 0;
  for (let product of prodArr) {
    indexNum++;
    // Calculate checkout total
    checkoutPrice += parseFloat(product.price);
    const cartItems = document.querySelector(".cart-items");
    // const response = await fetch(`/api/products/${product.id}`); Use this if you want the cart on the user
    // const data = await response.json();
    // console.log(data);
    // Create div for the item
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    cartItems.appendChild(itemDiv);
    // add image div
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("item-img");
    itemDiv.appendChild(imgDiv);
    // add image link
    const imgLink = document.createElement("a");
    imgLink.setAttribute("href", `/products/${product.id}`);
    imgDiv.appendChild(imgLink);
    // bring in image element
    const img = document.createElement("img");
    setTimeout(() => {
      return img.setAttribute("src", `${product.imgurl}`);
    }, 500);
    imgLink.appendChild(img);
    // create item info div
    const itemInfo = document.createElement("div");
    itemInfo.classList.add("item-info");
    itemDiv.appendChild(itemInfo);
    // create div for name and price
    const namePriceDiv = document.createElement("div");
    itemInfo.appendChild(namePriceDiv);
    // bring in product name
    const title = document.createElement("p");
    title.innerText = `${product.name}`;
    title.classList.add("title", "mb");
    namePriceDiv.appendChild(title);
    // bring in price
    const priceP = document.createElement("p");
    priceP.classList.add("price", "mb");
    priceP.innerText = "Product Price: ";
    namePriceDiv.appendChild(priceP);
    const priceSpan = document.createElement("span");
    priceSpan.innerText = `$${parseFloat(product.price).toFixed(2)}`;
    priceSpan.classList.add("success");
    priceP.appendChild(priceSpan);
    // Bring in Size
    const sizeP = document.createElement("p");
    sizeP.classList.add("size", "mb");
    sizeP.innerText = `Size: ${product.size}`;
    namePriceDiv.appendChild(sizeP);
    // Add in divider
    const divide = document.createElement("div");
    divide.classList.add("dark-divide");
    itemInfo.appendChild(divide);
    // Bring in description
    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("description", "mb");
    descriptionDiv.innerText = `${product.description}`;
    itemInfo.appendChild(descriptionDiv);
    // Bring in button div
    const btnDiv = document.createElement("div");
    btnDiv.classList.add("mb");
    itemInfo.appendChild(btnDiv);
    // bring in button
    const deleteBtn = document.createElement("a");
    deleteBtn.classList.add("btn-delete");
    deleteBtn.setAttribute("data-id", `${product.id}`);
    deleteBtn.setAttribute("data-index", `${indexNum}`);
    deleteBtn.innerText = "Remove";
    btnDiv.appendChild(deleteBtn);
    // Add event handler for removing an item from cart
    deleteBtn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      const itemArrIndex = e.target.getAttribute("data-index");
      let items = JSON.parse(localStorage.getItem("cart"));
      let itemArr = [];
      items.map((index) => {
        return itemArr.push(index);
      });
      itemArr.splice(itemArrIndex, 1);
      localStorage.setItem("cart", JSON.stringify(itemArr));
      location.reload();
    });
  }
  const totalSpan = document.querySelector("#totalDue");
  totalSpan.innerText = parseFloat(checkoutPrice).toFixed(2);
});
