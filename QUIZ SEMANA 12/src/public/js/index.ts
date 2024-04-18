const input = document.getElementById("input-text") as HTMLInputElement;
const searchButton = document.getElementById("button-search");

const pageLink = Array.from(document.getElementsByClassName("page-numbers"));

searchButton?.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = `/search?input=${input.value}`;
});

pageLink.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = `/?page=${link.innerHTML}`;
  });
});
