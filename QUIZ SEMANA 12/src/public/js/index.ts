const input = document.getElementById("input-text") as HTMLInputElement;
const searchButton = document.getElementById("button-search");

searchButton?.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = `/search?input=${input.value}`;
});


