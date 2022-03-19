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
