console.log("in pub checkout");
const submitBtn = document.getElementById("button-text");
const stripe = Stripe(stripePub);

submitBtn.addEventListener("click", (e) => {
  return handleSubmit(e);
});

window.addEventListener("DOMContentLoaded", async () => {
  let cartItems = await JSON.parse(localStorage.getItem("cart"));
  let products = [];
  let total = 0;
  for (let item of cartItems) {
    const prod = {
      id: item.id,
      price: item.price,
      size: item.size,
    };
    products.push(prod);
    total += parseFloat(item.price);
  }
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
      // Make sure to change this to your payment completion page
      return_url: "http://localhost:3000/checkout",
    },
  });

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === "card_error" || error.type === "validation_error") {
    console.log(error.message);
    showMessage(error.message);
  } else {
    console.log(error.message);
    showMessage("An unexpected error occured.");
  }

  setLoading(false);
}
