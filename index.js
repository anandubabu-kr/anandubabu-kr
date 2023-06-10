document.querySelector("html").classList.add("dark");

function openNaveBar() {
  const menu = document.getElementById("menu-container");
  console.log("invoked", menu);
  menu.classList.add("active");
}

function closeNaveBar() {
  const menu = document.getElementById("menu-container");
  console.log("invoked", menu);
  menu.classList.remove("active");
}
