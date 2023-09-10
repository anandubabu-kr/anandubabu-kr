const fadeInCards = document.querySelectorAll(".fade-in");

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        entry.target.style.animation = `fade-in 1s ease-in-out`;
      } else {
        entry.target.style.animation = "none";
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
