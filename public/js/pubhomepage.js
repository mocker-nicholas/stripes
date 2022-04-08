const emailBtn = document.getElementById("emailme");

emailBtn.addEventListener("click", (e) => {
  const firstName = document.getElementById("firstname");
  const lastName = document.getElementById("lastname");
  const email = document.getElementById("email");
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const inputs = [firstName, lastName, email];
  for (let input of inputs) {
    if (input.value === "") {
      e.preventDefault();
      input.addEventListener("click", (e) => {
        input.classList.remove("required");
      });
      input.classList.add("required");
    }
  }
  if (!email.value.match(emailRegex)) {
    const errorDiv = document.querySelector(".errorDiv");
    errorDiv.classList.remove("hide");
    errorDiv.textContent = "Please enter valid email";
    errorDiv.classList.add("required");
    email.addEventListener("click", () => {
      errorDiv.classList.add("hide");
    });
    e.preventDefault();
  }
  return;
});
