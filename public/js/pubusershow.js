const deleteBtn = document.getElementById("accountdelete");
const modalBack = document.getElementById("modalBack");
const modal = document.querySelector(".modal");

const showModal = (message) => {
  const modalMessage = document.querySelector(".modal-message");
  modal.classList.remove("hide");
  modalMessage.innerText = `${message}`;
  console.log(message);
  return;
};

const hideModal = () => {
  modal.classList.add("hide");
  console.log("hey");
  return;
};

deleteBtn.addEventListener("click", () => {
  return showModal("Are you sure you want to delete your account?");
});

modalBack.addEventListener("click", () => {
  return hideModal();
});
