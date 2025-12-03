// =====================================
// Clean, readable rewrite of your script
// Modular Router + Page System with Sidebar Toggle & Title Centering
// =====================================

// -------------------------------
// Route Definitions
// -------------------------------
const routes = {
  "#home":      { title: "Home",        templateId: "page-home" },
  "#about":     { title: "About",       templateId: "page-about" },
  "#experience":{ title: "Experience",  templateId: "page-experience" },
  "#projects":  { title: "Projects",    templateId: "page-projects" },
  "#skills":    { title: "Skills",      templateId: "page-skills" },
  "#contact":   { title: "Contact",     templateId: "page-contact" }
};

const defaultRoute = "#home";
const pageContent  = document.getElementById("pageContent");
const pageTitle    = document.getElementById("pageTitle");
const sidebar      = document.querySelector("aside");
const sidebarTop   = document.querySelector(".sidebar-top");

// -------------------------------
// Navigation Highlighting
// -------------------------------
function setActiveNav(hash) {
  document.querySelectorAll(".nav a").forEach(link => {
    link.dataset.active = (link.getAttribute("href") === hash);
  });
}

// -------------------------------
// Router Renderer
// -------------------------------
function renderRoute(hash) {
  const route = routes[hash] || routes[defaultRoute];

  // Set page title
  pageTitle.textContent = route.title;

  // Load template
  const tpl = document.getElementById(route.templateId);
  const clone = document.importNode(tpl.content, true);

  // Animate
  pageContent.classList.add("page-enter");
  pageContent.innerHTML = "";
  pageContent.appendChild(clone);

  requestAnimationFrame(() => {
    pageContent.classList.add("page-enter-active");
    pageContent.classList.remove("page-enter");
  });

  setActiveNav(hash);
  runPageScripts(hash);

  pageContent.scrollTop = 0;
}

// Listen for navigation
window.addEventListener("hashchange", () => {
  renderRoute(location.hash || defaultRoute);
});

if (!location.hash) location.hash = defaultRoute;
renderRoute(location.hash || defaultRoute);

// -------------------------------
// Card Factory
// -------------------------------
function createCard(item) {
  const card = document.createElement("div");
  card.className = "card reveal";

  card.innerHTML = `
    <div style="display:flex;justify-content:space-between;">
      <div>
        <strong>${item.title}</strong>
        <div class="meta">${item.role} • ${item.company}</div>
      </div>
      <div class="meta">${item.period}</div>
    </div>
    <p>${item.description}</p>
  `;

  return card;
}

// -------------------------------
// Sample Data
// -------------------------------
const sampleExperience = [
  { title: "Senior Frontend Engineer", role: "Frontend", company: "Acme Corp", period: "2022 — Present", description: "Led the migration to a design system." },
  { title: "Product Engineer", role: "Fullstack", company: "Startup Inc", period: "2019 — 2022", description: "Built core features for thousands of users." }
];

const sampleProjects = [
  { title: "Design System", desc: "Reusable components and tokens." },
  { title: "Analytics Dashboard", desc: "Interactive visualizations." }
];

const sampleSkills = ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Accessibility"];

// -------------------------------
// Page-Specific Scripts
// -------------------------------
function runPageScripts(hash) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  if (hash === "#experience") {
    const list = document.getElementById("experienceList");
    list.innerHTML = "";
    sampleExperience.forEach(item => list.appendChild(createCard(item)));
  }

  if (hash === "#projects") {
    const grid = document.getElementById("projectsGrid");
    grid.innerHTML = "";
    sampleProjects.forEach(pr => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<strong>${pr.title}</strong><p class="meta">${pr.desc}</p>`;
      grid.appendChild(card);
    });
  }

  if (hash === "#skills") {
    const pills = document.getElementById("skillPills");
    pills.innerHTML = "";
    sampleSkills.forEach(skill => {
      const pill = document.createElement("span");
      pill.className = "pill";
      pill.textContent = skill;
      pills.appendChild(pill);
    });
  }
}

// -------------------------------
// Print & PDF
// -------------------------------
document.getElementById("printBtn").onclick = () => window.print();
document.getElementById("downloadPdf").onclick = () => alert("Use your browser's Print → Save as PDF.");

// -------------------------------
// Theme Toggle
// -------------------------------
document.getElementById("toggleTheme").onclick = () => {
  const isLight = document.body.dataset.theme === "light";
  if (!isLight) {
    document.body.dataset.theme = "light";
    document.documentElement.style.setProperty("--bg", "#f7fafc");
    document.documentElement.style.setProperty("--text", "#0b1220");
  } else {
    document.body.dataset.theme = "";
    document.documentElement.style.removeProperty("--bg");
    document.documentElement.style.removeProperty("--text");
  }
};

// -------------------------------
// Sidebar Toggle with Centered Tit

