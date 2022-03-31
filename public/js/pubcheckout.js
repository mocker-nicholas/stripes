console.log("in pub checkout");
const submitBtn = document.getElementById("button-text");
const stripe = Stripe(stripePub);

// Listen for the user to submit the payment method
submitBtn.addEventListener("click", (e) => {
  return handleSubmit(e);
});

// Generate Shopping Cart Items and total
window.addEventListener("DOMContentLoaded", async () => {
  let cartItems = await JSON.parse(localStorage.getItem("cart"));
  let products = [];
  let total = 0;

  for (let item of cartItems) {
    const prod = {
      id: item.id,
      price: item.price,
      size: item.size,
      name: item.name,
      description: item.description,
    };
    products.push(prod);
    total += parseFloat(item.price);
  }

  // Generate cart items in dom
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    const productInfo = document.querySelector(".products-info");
    productDiv.classList.add("product", "mb");
    // create product title
    const titleP = document.createElement("p");
    titleP.textContent = `${product.name}`;
    productDiv.appendChild(titleP);
    // create product size
    const sizeP = document.createElement("p");
    sizeP.textContent = `Size: ${product.size}`;
    productDiv.appendChild(sizeP);
    // create product price
    const priceP = document.createElement("p");
    priceP.innerText = `Price: ${parseFloat(product.price).toFixed(2)}`;
    priceP.classList.add("success");
    productDiv.appendChild(priceP);
    // Create Divider
    const divide = document.createElement("div");
    divide.classList.add("dark-divide");
    productDiv.appendChild(divide);
    // create product description
    const descriptionP = document.createElement("p");
    descriptionP.innerText = `${product.description}`;
    productDiv.appendChild(descriptionP);
    productInfo.appendChild(productDiv);
  });

  // Create a payment intent for the total of the shopping cart
  const response = await fetch("/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      products: products,
      total: parseFloat(total).toFixed(2),
    }),
  });
  const data = await response.json();
  const clientSecret = data.client_secret;
  const appearance = {
    theme: "stripe",
  };

  elements = stripe.elements({ appearance, clientSecret });

  const paymentElement = elements.create("payment");
  paymentElement.mount("#payment-element");
});

const showMessage = (e) => {
  console.log(e);
};

async function handleSubmit(e) {
  e.preventDefault();
  //   setLoading(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: "http://localhost:3000/checkout",
    },
  });
  if (error.type === "card_error" || error.type === "validation_error") {
    console.log(error.message);
    showMessage(error.message);
  } else {
    console.log(error.message);
    showMessage("An unexpected error occured.");
  }

  setLoading(false);
}
