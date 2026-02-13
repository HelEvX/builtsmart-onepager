"use strict";

const normalizePath = (path) => {
  const clean = path.replace(/\/+$/, "") || "/";
  return clean === "/index.html" ? "/" : clean;
};

const loadPartials = async () => {
  const partialNodes = document.querySelectorAll("[data-include]");
  const tasks = [...partialNodes].map(async (node) => {
    const includePath = node.getAttribute("data-include");
    if (!includePath) return;

    try {
      const response = await fetch(includePath, { cache: "no-store" });
      if (!response.ok) return;
      const html = await response.text();
      node.outerHTML = html;
    } catch (_) {
      return;
    }
  });

  await Promise.all(tasks);
};

const initMobileMenu = () => {
  const mainMenus = document.querySelectorAll("#main-menu");

  mainMenus.forEach((menu) => {
    const mobileContainer = menu.closest(".row")?.querySelector(".mobile-nav-menu");
    if (!mobileContainer) return;

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.className = "mobile-nav-toggle";
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.setAttribute("aria-label", "Open menu");
    toggleButton.innerHTML = '<i class="ri-menu-line" aria-hidden="true"></i>';
    mobileContainer.appendChild(toggleButton);

    toggleButton.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggleButton.setAttribute("aria-expanded", String(isOpen));
      toggleButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      toggleButton.innerHTML = isOpen
        ? '<i class="ri-close-line" aria-hidden="true"></i>'
        : '<i class="ri-menu-line" aria-hidden="true"></i>';
    });
  });
};

const initFaqHeadingState = () => {
  if (window.jQuery) {
    window
      .jQuery(".panel-collapse")
      .on("shown.bs.collapse", function () {
        window.jQuery(".panel-heading").removeClass("active");
        window.jQuery(this).closest(".panel").find(".panel-heading").addClass("active");
      })
      .on("hidden.bs.collapse", function () {
        window.jQuery(this).closest(".panel").find(".panel-heading").removeClass("active");
      });
  }
};

const initSmoothScroll = () => {
  const currentPath = normalizePath(window.location.pathname);

  const hashLinks = document.querySelectorAll("a[href*='#']");
  hashLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const targetUrl = new URL(href, window.location.href);
      const targetPath = normalizePath(targetUrl.pathname);
      const targetHash = targetUrl.hash;
      if (!targetHash) return;

      if (targetPath !== currentPath) return;

      const targetElement = document.querySelector(targetHash);
      if (!targetElement) return;

      event.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", targetHash);
    });
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  await loadPartials();
  initMobileMenu();
  initFaqHeadingState();
  initSmoothScroll();
});
