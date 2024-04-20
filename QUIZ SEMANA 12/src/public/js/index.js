const input = document.getElementById("input-text");
const searchButton = document.getElementById("button-search");
const pageLink = Array.from(document.getElementsByClassName("page-numbers"));

searchButton?.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = `/search?input=${input.value}&page=1`;
});

pageLink.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    let page = link.innerHTML;
    const currentPage =
      document.location.href.split("?page=")[1] !== undefined
        ? document.location.href.split("?page=")[1]
        : document.location.href.split("&page=")[1] === undefined
        ? "1"
        : document.location.href.split("&page=")[1];
    console.log(currentPage);
    if (link.ariaLabel === "Previous") {
      page = (Number(currentPage) - 1).toString();
    } else if (link.ariaLabel === "Next") {
      page = (Number(currentPage) + 1).toString();
    }
    console.log(page);
    if (document.location.pathname === "/search") {
      window.location.href = `/search?input=${input.value}&page=${page}`;
    } else if (document.location.pathname === "/order") {
      window.location.href = `/order?order=${input.value}&page=${page}`;
    } else {
      window.location.href = `/?page=${page}`;
    }
  });
});
