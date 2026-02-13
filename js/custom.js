"use strict";

document.addEventListener("DOMContentLoaded", () => {
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

  const scrollLinks = document.querySelectorAll("a[data-scroll-nav]");
  scrollLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const index = link.getAttribute("data-scroll-nav");
      const target = index ? document.querySelector(`[data-scroll-index='${index}']`) : null;
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
