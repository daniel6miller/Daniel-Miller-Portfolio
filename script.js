// script.js

// On load: reveal main; remove loader
window.addEventListener("load", () => {
  document.querySelector(".main").classList.remove("hidden");
  document.querySelector(".home-section").classList.add("active");
  const loader = document.querySelector(".page-loader");
  loader.classList.add("fade-out");
  setTimeout(() => { loader.style.display = "none"; }, 300);
});

// ---- Theme toggle ----
const ball = document.querySelector(".toggle-ball");
ball?.addEventListener("click", () => {
  document.documentElement.classList.toggle("theme-dark"); // toggle on <html>
  ball.classList.toggle("active");
});

// ---- Nav toggle ----
const navToggler = document.querySelector(".nav-toggler");
function toggleNavbar(){ document.querySelector(".header").classList.toggle("active"); }
function hideSection(){ document.querySelector("section.active")?.classList.toggle("fade-out"); }

navToggler?.addEventListener("click", ()=>{
  hideSection();
  toggleNavbar();
  document.body.classList.toggle("hide-scrolling");
});

// ---- Section routing (links with .link-item and a data-target="#id") ----
document.addEventListener("click", (e) => {
  const el = e.target;
  if (!(el instanceof Element)) return;

  if (el.classList.contains("link-item")) {
    const target = el.getAttribute("href") || el.getAttribute("data-target") || el.hash;
    if (!target) return;

    e.preventDefault();
    document.querySelector(".overlay").classList.add("active");
    navToggler?.classList.add("hide");

    if (el.classList.contains("nav-item")) toggleNavbar();
    else hideSection();

    document.body.classList.add("hide-scrolling");

    setTimeout(() => {
      const current = document.querySelector("section.active");
      current?.classList.remove("active", "fade-out");
      document.querySelector(target)?.classList.add("active");
      window.scrollTo({ top: 0, behavior: "instant" });
      document.body.classList.remove("hide-scrolling");
      navToggler?.classList.remove("hide");
      document.querySelector(".overlay").classList.remove("active");
    }, 300);
  }
});

// ---- Project tabs (unchanged) ----
const tabsContainer = document.querySelector(".project-tabs");
const projectSection = document.querySelector(".projects-section");

tabsContainer?.addEventListener("click", (e) => {
  const el = e.target;
  if (!(el instanceof Element)) return;

  if (el.classList.contains("tab-item") && !el.classList.contains("active")) {
    tabsContainer.querySelector(".active")?.classList.remove("active");
    el.classList.add("active");

    const targetSel = el.getAttribute("data-target");
    if (!targetSel) return;

    projectSection.querySelector(".tab-content.active")?.classList.remove("active");
    projectSection.querySelector(targetSel)?.classList.add("active");

    projectSection.querySelectorAll(".project-item").forEach((it) => it.classList.remove("active"));
    projectSection.querySelectorAll(`${targetSel} .project-item`).forEach((it) => it.classList.add("active"));
  }
});

(() => {
  const body = document.body;
  const main = document.querySelector(".main");
  const popup = document.getElementById("projectPopup");
  if (!popup) return;

  const ppTitle = popup.querySelector("#pp-title");
  const ppBody  = popup.querySelector(".pp-body");  // <— inject here
  const ppCloseBtn = popup.querySelector(".pp-close");

  function openPopup({ title, detailsHTML }) {
    ppTitle.textContent = title || "Project";
    ppBody.innerHTML = detailsHTML || "";

    popup.classList.add("open");
    popup.setAttribute("aria-hidden", "false");
    body.classList.add("hide-scrolling");
    main && main.classList.add("fade-out");
    ppBody.scrollTop = 0;

    // harden external links
    ppBody.querySelectorAll('a[target="_blank"]').forEach(a => {
      a.setAttribute("rel", "noopener noreferrer");
    });
  }

  function closePopup() {
    popup.classList.remove("open");
    popup.setAttribute("aria-hidden", "true");
    body.classList.remove("hide-scrolling");
    main && main.classList.remove("fade-out");
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".view-project-btn");
    if (!btn) return;

    const card = btn.closest(".project-item");
    if (!card) return;

    const title   = card.querySelector(".project-item-title")?.textContent?.trim() || "Project";
    // grab the *content* (we don’t need inner .pp-body/.pp-scroll anymore)
    const details = card.querySelector(".project-item-details");
    openPopup({ title, detailsHTML: details?.innerHTML || "" });
  });

  ppCloseBtn?.addEventListener("click", closePopup);

  popup.addEventListener("click", (e) => {
    if (e.target === popup || e.target.hasAttribute("data-pp-overlay")) closePopup();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup.classList.contains("open")) closePopup();
  });
})();

