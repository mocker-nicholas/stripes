console.log("inside pub util js");
const shopNav = document.querySelector("#shop");
const dropdown = document.querySelector(".dropdown");

shopNav.addEventListener("mouseover", () => {
  shopNav.nextElementSibling.classList.remove("hide");
});

dropdown.addEventListener("mouseleave", () => {
  dropdown.classList.add("hide");
});
