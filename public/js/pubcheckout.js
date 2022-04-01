console.log("in pub checkout");
const stripeForm = document.getElementById("payment-form");
const stripe = Stripe(stripePub);

// Generate Shopping Cart Items and total
window.addEventListener("DOMContentLoaded", async () => {
  const products = await getCartProducts();
  const total = getTotal(products);
  createProducts(products);
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

//// Listen for form submit
stripeForm.addEventListener("submit", (e) => {
  handleSubmit(e);
});

///// Send the payment method to stripe
async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: "http://localhost:3000/checkout/complete",
    },
  });
  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
  } else {
    showMessage("An unexpected error occured.");
  }

  setLoading(false);
}

//// Display a message to the user
function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");
  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageText.textContent = "";
  }, 4000);
}

///// Set your Loader
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}

//// Check the payment status
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  switch (paymentIntent.status) {
    case "succeeded":
      showMessage("Payment succeeded!");
      break;
    case "processing":
      showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.");
      break;
    default:
      showMessage("Something went wrong.");
      break;
  }
}

//// Get products from local storage
async function getCartProducts() {
  let cartItems = await JSON.parse(localStorage.getItem("cart"));
  let products = [];

  for (let item of cartItems) {
    const prod = {
      id: item.id,
      price: item.price,
      size: item.size,
      name: item.name,
      description: item.description,
    };
    products.push(prod);
  }

  return products;
}

////// Get a total for all of your products
function getTotal(products) {
  let total = 0;
  for (let product of products) {
    total = parseFloat(product.price) + total;
  }
  return parseFloat(total).toFixed(2);
}

/////// Generate the products in the dom
function createProducts(products) {
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
    priceP.classList.add("priceP");
    const spanP = document.createElement("span");
    spanP.innerText = `Price: $${parseFloat(product.price).toFixed(2)}`;
    spanP.classList.add("price");
    priceP.appendChild(spanP);
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
}
