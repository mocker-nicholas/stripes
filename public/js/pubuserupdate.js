const updateBtn = document.getElementById("update");
const vals = document.querySelectorAll(".validate");

updateBtn.addEventListener("click", (e) => {
  for (let i = 0; i < vals.length; i++) {
    let val = vals[i];
    let content = vals[i].value;
    if (content === "") {
      e.preventDefault();
      const label = val.parentElement.previousElementSibling.firstElementChild;
      label.textContent = `${label.textContent.replace("*", "")}`;
      label.textContent = `*${label.textContent}`;
      label.classList.add("red");
      //   label.textContent = `${label.textContent} *required`;
      val.classList.add("required");
      val.addEventListener("click", () => {
        label.textContent = `${label.textContent.replace("*", "")}`;
        val.classList.remove("required");
        label.classList.remove("red");
      });
      return;
    }
  }
});
