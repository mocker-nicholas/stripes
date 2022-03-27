console.log("inside pub cart js");

addEventListener("DOMContentLoaded", async (e) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let prodArr = [];
  cart = cart.map((index) => {
    return prodArr.push(JSON.parse(index));
  });
  for (let product of prodArr) {
    const cartItems = document.querySelector(".cart-items");
    // const response = await fetch(`/api/products/${product.id}`);
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
    deleteBtn.innerText = "Remove Item";
    btnDiv.appendChild(deleteBtn);
    btnDiv.addEventListener("click", (e) => {
      console.log("got me");
    });
  }
});
