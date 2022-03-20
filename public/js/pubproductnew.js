console.log("inside public new");
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
  return (priceInput.value = displayNum);
};

priceInput.addEventListener("blur", (e) => {
  return checkPrice(e.target.value);
});
