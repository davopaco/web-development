const input = document.getElementById("input-text") as HTMLInputElement;
const searchButton = document.getElementById("button-search");

console.log("hola");

searchButton?.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("got in");
  window.location.href = `/search?input=${input.value}`;
});
