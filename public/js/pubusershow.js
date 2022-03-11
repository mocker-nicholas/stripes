console.log("inside pubusershow");
const deleteBtn = document.getElementById("accountdelete");
const modal = document.querySelector(".modal");

const showModal = (message) => {
  const modalMessage = document.querySelector(".modal-message");
  modal.classList.remove("hide");
  modalMessage.innerText = `${message}`;
  console.log(message);
  return;
};
deleteBtn.addEventListener("click", () => {
  return showModal("Are you sure you want to delete your account?");
});
