console.log("in pub checkout");

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
  console.log(data);
});
