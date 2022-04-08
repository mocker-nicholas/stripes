const createBtn = document.getElementById("createBtn");

createBtn.addEventListener("click", (e) => {
  const valinputs = document.querySelectorAll(".validate");
  for (let input of valinputs) {
    if (input.value === "") {
      e.preventDefault();
      input.classList.add("required");
      input.addEventListener("click", () => {
        input.classList.remove("required");
      });
    }
  }
});

const priceInput = document.getElementById("price");

const checkPrice = (price) => {
  const displayNum = (Math.round(price * 100) / 100).toFixed(2);
  console.log(displayNum);
  if (displayNum == "NaN") {
    priceInput.classList.add("required");
    return (priceInput.value = "Please Input a valid price");
  }
  return (priceInput.value = displayNum);
};

priceInput.addEventListener("blur", (e) => {
  console.log(e.target.value);
  return checkPrice(e.target.value);
});

priceInput.addEventListener("focus", (e) => {
  e.target.classList.remove("required");
});
