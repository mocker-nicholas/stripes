console.log("inside pub util js");

//////////// Add the dropdown menu on hover for the shop button ////////////////
const shopNav = document.querySelector("#shop");
const dropdown = document.querySelector(".dropdown");

shopNav.addEventListener("mouseover", () => {
  shopNav.nextElementSibling.classList.remove("hide");
});

dropdown.addEventListener("mouseleave", () => {
  dropdown.classList.add("hide");
});

///////////////////////// Display Mobile Menu on a click /////////////////////////////
const burger = document.querySelector(".burger");
burger.addEventListener("click", () => {
  const smallNav = document.querySelector(".small-nav");
  smallNav.classList.toggle("hide");
});
