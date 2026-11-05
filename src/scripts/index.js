// Homepage interactions. Loaded from IndexLayout; runs after the DOM is parsed.
// Everything degrades gracefully: without JS the page is fully visible and
// usable (see the `.js` guard in global.css).

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ---------- Scroll reveal: fade up once, staggered among siblings ---------- */
const revealItems = document.querySelectorAll(".fade-in");

revealItems.forEach((el) => {
  const siblings = [...(el.parentElement?.children ?? [])].filter((c) =>
    c.classList.contains("fade-in")
  );
  el.style.setProperty("--i", String(Math.min(siblings.indexOf(el), 5)));
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealItems.forEach((el) => revealObserver.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add("show"));
}

/* ---------- Nav background, scroll progress, back-to-top ---------- */
const nav = document.querySelector("[data-site-nav]");
const progress = document.querySelector("[data-progress]");
const backToTop = document.querySelector("[data-back-to-top]");

let ticking = false;
function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;

  if (nav) nav.dataset.scrolled = String(y > 24);
  if (progress)
    progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
  backToTop?.toggleAttribute("data-visible", y > 600);
  ticking = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  },
  { passive: true }
);
onScroll();

/* ---------- Highlight the nav link for the section in view ---------- */
const navLinks = [...document.querySelectorAll("[data-nav-link]")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (sections.length && "IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          const matches = link.getAttribute("href") === id;
          if (entry.isIntersecting) {
            if (matches) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          } else if (matches) {
            // section left the middle band (e.g. scrolled back up to the hero)
            link.removeAttribute("aria-current");
          }
        });
      }
    },
    // a section is "current" when it crosses the middle of the viewport
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));
}

/* ---------- Mobile menu ---------- */
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.getElementById("mobile-menu");

function setMenu(open) {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  mobileMenu.hidden = !open;
  if (nav) nav.dataset.menuOpen = String(open);
}

menuButton?.addEventListener("click", () =>
  setMenu(menuButton.getAttribute("aria-expanded") !== "true")
);
mobileMenu?.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuButton.focus();
  }
});
window.matchMedia("(min-width: 768px)").addEventListener("change", (mq) => {
  if (mq.matches) setMenu(false);
});

/* ---------- Hero card: tilt + pointer light (mouse/pen only) ---------- */
const tiltCard = document.querySelector("[data-tilt]");

if (tiltCard && window.matchMedia("(pointer: fine)").matches) {
  tiltCard.addEventListener("pointermove", (e) => {
    const r = tiltCard.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    tiltCard.style.setProperty("--mx", `${x * 100}%`);
    tiltCard.style.setProperty("--my", `${y * 100}%`);
    if (!reduceMotion.matches) {
      tiltCard.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 6}deg)`;
    }
  });
  tiltCard.addEventListener("pointerleave", () => {
    tiltCard.style.transform = "";
  });
}
