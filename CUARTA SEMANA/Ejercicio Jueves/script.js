const form1 = document.querySelector("#form1");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const box = document.createElement("div");
const header = document.createElement("h1");

box.classList.add("msn");

header.textContent = "CONTRASEÑA INCORRECTA";
box.appendChild(header);

form1.addEventListener("submit", (e) => {
  e.preventDefault();
  if (password.value !== "hola1234") {
    document.body.appendChild(box);
  } else {
    box.remove();
  }
});
