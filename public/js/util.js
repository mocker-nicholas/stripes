console.log("inside pub util js");

///////////////////////// Display Mobile Menu on a click /////////////////////////////
const burger = document.querySelector(".burger");
burger.addEventListener("click", () => {
  const smallNav = document.querySelector(".small-nav");
  smallNav.classList.toggle("hide");
});
