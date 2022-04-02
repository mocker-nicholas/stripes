console.log("inside pub util js");

///////////////////////// Display Mobile Menu on a click /////////////////////////////
const burger = document.querySelector(".burger");
burger.addEventListener("click", () => {
  // Get rid of first line
  const topLine = document.querySelector(".line");
  topLine.classList.toggle("hide");
  // move the midde line
  const midLine = document.querySelector(".line:nth-of-type(2)");
  midLine.classList.toggle("mid-line-center");
  // move the last line
  const lastLine = document.querySelector(".line:nth-of-type(3)");
  lastLine.classList.toggle("bottom-line-center");
  // Bring in small navbar
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

const pickRand = (arr) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};
