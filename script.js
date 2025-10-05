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

// ---- Project tabs ----
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

    // Show/hide project items inside that tab
    projectSection.querySelectorAll(".project-item").forEach((it) => it.classList.remove("active"));
    projectSection.querySelectorAll(`${targetSel} .project-item`).forEach((it) => it.classList.add("active"));
  }
});

// ---- Popup (details/game) ----
const popup = document.querySelector(".project-popup");
const ppInner = popup?.querySelector(".pp-inner");
const ppClose = popup?.querySelector(".pp-close");
const ppHeaderTitle = popup?.querySelector(".pp-header h3");
const ppBody = popup?.querySelector(".pp-body");

function toggleProjectPopup() {
  popup.classList.toggle("open");
  document.body.classList.toggle("hide-scrolling");
  document.querySelector(".main").classList.toggle("fade-out");
}

function projectItemDetails(projectItem){
  ppHeaderTitle.textContent = projectItem.querySelector(".project-item-title")?.textContent || "";
  ppBody.innerHTML = projectItem.querySelector(".project-item-details")?.innerHTML || "";
  secureExternalLinks(ppBody);
}

function projectGameDetails(projectItem){
  ppHeaderTitle.textContent = "Preview";
  ppBody.innerHTML = projectItem.querySelector(".project-item-game")?.innerHTML || "";
  secureExternalLinks(ppBody);
}

// Secure _blank links inside injected HTML
function secureExternalLinks(scope){
  scope?.querySelectorAll('a[target="_blank"]').forEach(a => {
    a.setAttribute("rel", "noopener noreferrer");
  });
}

// Open/close popup
document.addEventListener("click", (e) => {
  const el = e.target;
  if (!(el instanceof Element)) return;

  if (el.classList.contains("view-project-btn")) {
    toggleProjectPopup();
    popup.scrollTo(0,0);
    projectItemDetails(el.closest(".project-item"));
  }
  if (el.classList.contains("view-game-btn")) {
    toggleProjectPopup();
    popup.scrollTo(0,0);
    projectGameDetails(el.closest(".project-item"));
  }
  if (el.classList.contains("pp-inner")) toggleProjectPopup();
});

ppClose?.addEventListener("click", toggleProjectPopup);

// Escape key closes popup
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && popup?.classList.contains("open")) toggleProjectPopup();
});
