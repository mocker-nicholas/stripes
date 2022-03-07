console.log("Inside public register");

const showError = (element, message) => {
  const errorDiv = element.nextElementSibling;
  element.setAttribute("style", "border: 2px solid red");
  errorDiv.classList.remove("hide");
  errorDiv.innerText = `${message}`;
  return;
};

const formbtn = document.querySelector("#registerbtn");
formbtn.addEventListener("click", (e) => {
  const username = document.querySelector("#username");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  username.setAttribute("style", "border: 2px solid transparent");
  if (!username.value.match(usernameRegex)) {
    e.preventDefault();
    let message =
      "Username must be 9 characters long, can include letters, numbers, and dashes";
    return showError(username, message);
  }
  email.setAttribute("style", "border: 2px solid transparent");
  if (!email.value.match(emailRegex)) {
    e.preventDefault();
    let message = "Must be a valid email address";
    return showError(email, message);
  }
  password.setAttribute("style", "border: 2px solid transparent");
  if (!password.value.match(passwordRegex)) {
    e.preventDefault();
    let message =
      "Password must be 8 character with one number and one special character";
    return showError(password, message);
  }
});
