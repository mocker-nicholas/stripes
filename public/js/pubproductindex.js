// If there are no featured products, hide the featured message div
window.addEventListener("DOMContentLoaded", (e) => {
  const featured = document.querySelector(".featured-products");
  if (featured.children.length === 0) {
    const featuredMessage = document.querySelector(".featured-message");
    featuredMessage.setAttribute("style", "margin: 0;");
  }
});
