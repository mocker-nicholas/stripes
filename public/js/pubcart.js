console.log("inside pub cart js");

addEventListener("DOMContentLoaded", async (e) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let prodArr = [];

  // Check to see if there are items in the cart
  if (cart) {
    cart = cart.map((index) => {
      return prodArr.push(JSON.parse(index));
    });
  }
  // Generate the UI for the items in the cart
  let indexNum = -1;
  for (let product of prodArr) {
    indexNum++;
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
    // bring in image element
    const img = document.createElement("img");
    img.setAttribute("src", `${product.imgurl}`);
    imgDiv.appendChild(img);
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
    priceSpan.innerText = `$${product.price}`;
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
    // Bring in button
    const btnDiv = document.createElement("div");
    btnDiv.classList.add("mb");
    itemInfo.appendChild(btnDiv);
    const deleteBtn = document.createElement("a");
    deleteBtn.classList.add("btn-delete");
    deleteBtn.setAttribute("data-id", `${product.id}`);
    deleteBtn.setAttribute("data-index", `${indexNum}`);
    deleteBtn.innerText = "Remove Item";
    btnDiv.appendChild(deleteBtn);
    // Add event handler for removing an item from cart
    deleteBtn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      const itemArrIndex = e.target.getAttribute("data-index");
      let items = JSON.parse(localStorage.getItem("cart"));
      let itemArr = [];
      items.map((index) => {
        return itemArr.push(JSON.parse(index));
      });
      // itemArr = itemArr.filter((item) => item.id !== id); This method removes every cart item with the same Id
      itemArr.splice(itemArrIndex, 1);
      itemArr = itemArr.map((item) => JSON.stringify(item));
      localStorage.setItem("cart", JSON.stringify(itemArr));
      e.target.parentElement.parentElement.parentElement.remove();
    });
  }
});
