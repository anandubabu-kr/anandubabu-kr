const fadeInCards = document.querySelectorAll(".fade-in");

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        // entry.target.style.animation = `fade-in 1s ease-in-out`;
      } else {
        // entry.target.style.animation = "none";
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0,
  }
);

fadeInCards.forEach((element) => {
  observer.observe(element);
});
