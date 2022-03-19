console.log("inside pub util js");

///////////////////////// Display Mobile Menu on a click /////////////////////////////
const burger = document.querySelector(".burger");
burger.addEventListener("click", () => {
  const smallNav = document.querySelector(".small-nav");
  smallNav.classList.toggle("hide");
});

const showError = (element, message) => {
  const errorDiv = element.nextElementSibling;
  element.setAttribute("style", "border: 2px solid red");
  errorDiv.classList.remove("hide");
  errorDiv.innerText = `${message}`;
  return;
};
