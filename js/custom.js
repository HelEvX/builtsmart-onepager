"use strict";

const normalizePath = (path) => {
  const clean = path.replace(/\/+$/, "") || "/";
  return clean === "/index.html" ? "/" : clean;
};

const PARTIAL_CACHE_PREFIX = "bs:partial:";
const COOKIE_DISMISS_KEY = "bs:cookie-banner:dismissed";

const getPartialCacheKey = (includePath) => `${PARTIAL_CACHE_PREFIX}${includePath}`;

const loadPartials = async () => {
  const partialNodes = document.querySelectorAll("[data-include]");
  const includePaths = [...new Set([...partialNodes].map((node) => node.getAttribute("data-include")).filter(Boolean))];
  const tasks = [...partialNodes].map(async (node) => {
    const includePath = node.getAttribute("data-include");
    if (!includePath) return;

    const cacheKey = getPartialCacheKey(includePath);
    const cachedPartial = sessionStorage.getItem(cacheKey);

    if (cachedPartial) {
      node.outerHTML = cachedPartial;
      return;
    }

    try {
      const response = await fetch(includePath, { cache: "force-cache" });
      if (!response.ok) return;
      const html = await response.text();
      sessionStorage.setItem(cacheKey, html);
      node.outerHTML = html;
    } catch (_) {
      return;
    }
  });

  await Promise.all(tasks);
  return includePaths;
};

const refreshPartialsInBackground = async (includePaths = []) => {
  if (!includePaths.length) return;

  const tasks = includePaths.map(async (includePath) => {
    try {
      const response = await fetch(includePath, { cache: "default" });
      if (!response.ok) return;
      const html = await response.text();
      sessionStorage.setItem(getPartialCacheKey(includePath), html);
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
    toggleButton.innerHTML = `
      <span class="mobile-nav-icon mobile-nav-icon--menu" aria-hidden="true">
        <i class="ri-menu-line" aria-hidden="true"></i>
      </span>
      <span class="mobile-nav-icon mobile-nav-icon--close" aria-hidden="true">
        <i class="ri-close-line" aria-hidden="true"></i>
      </span>
    `;
    mobileContainer.appendChild(toggleButton);

    toggleButton.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggleButton.setAttribute("aria-expanded", String(isOpen));
      toggleButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      toggleButton.classList.toggle("is-open", isOpen);
    });
  });
};

const initFaqAccordion = () => {
  const accordion = document.querySelector("#faq-accordion");
  if (!accordion) return;

  const items = [...accordion.querySelectorAll(".faq-item")];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const closeItem = (item) => {
    const trigger = item.querySelector(".faq-trigger");
    const panel = item.querySelector(".faq-panel");
    if (!trigger || !panel) return;

    trigger.setAttribute("aria-expanded", "false");
    item.classList.remove("is-open");

    if (prefersReducedMotion) {
      panel.hidden = true;
      panel.style.maxHeight = "0px";
      panel.style.opacity = "0";
      return;
    }

    if (panel.hidden) {
      panel.style.maxHeight = "0px";
      panel.style.opacity = "0";
      return;
    }

    const currentHeight = panel.scrollHeight;
    panel.style.maxHeight = `${currentHeight}px`;
    panel.style.opacity = "1";

    requestAnimationFrame(() => {
      panel.style.maxHeight = "0px";
      panel.style.opacity = "0";
    });

    const onTransitionEnd = (event) => {
      if (event.propertyName !== "max-height") return;
      panel.hidden = true;
      panel.removeEventListener("transitionend", onTransitionEnd);
    };

    panel.addEventListener("transitionend", onTransitionEnd);
  };

  const openItem = (item) => {
    const trigger = item.querySelector(".faq-trigger");
    const panel = item.querySelector(".faq-panel");
    if (!trigger || !panel) return;

    trigger.setAttribute("aria-expanded", "true");
    item.classList.add("is-open");

    panel.hidden = false;

    if (prefersReducedMotion) {
      panel.style.maxHeight = "none";
      panel.style.opacity = "1";
      return;
    }

    panel.style.maxHeight = "0px";
    panel.style.opacity = "0";
    panel.offsetHeight;

    const targetHeight = panel.scrollHeight;
    panel.style.maxHeight = `${targetHeight}px`;
    panel.style.opacity = "1";

    const onTransitionEnd = (event) => {
      if (event.propertyName !== "max-height") return;
      if (!item.classList.contains("is-open")) return;
      panel.style.maxHeight = "none";
      panel.removeEventListener("transitionend", onTransitionEnd);
    };

    panel.addEventListener("transitionend", onTransitionEnd);
  };

  items.forEach((item) => {
    const trigger = item.querySelector(".faq-trigger");
    const panel = item.querySelector(".faq-panel");
    if (!trigger || !panel) return;

    trigger.setAttribute("aria-expanded", "false");
    panel.hidden = true;
    panel.style.maxHeight = "0px";
    panel.style.opacity = "0";
    item.classList.remove("is-open");

    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      items.forEach((entry) => {
        if (entry === item) return;
        closeItem(entry);
      });

      if (!isOpen) {
        openItem(item);
      } else {
        closeItem(item);
      }
    });
  });
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

const initSponsorsBanner = () => {
  const banners = document.querySelectorAll("[data-sponsors-banner]");
  if (!banners.length) return;

  banners.forEach((banner) => {
    const track = banner.querySelector(".sponsors-track");
    if (!track) return;

    const originalItems = [...track.querySelectorAll(".sponsor-item")];
    if (originalItems.length < 2) return;

    const cloneCount = Math.min(originalItems.length, 4);
    for (let index = 0; index < cloneCount; index++) {
      const clone = originalItems[index].cloneNode(true);
      clone.classList.add("is-clone");
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    }

    let itemWidth = 0;
    let currentIndex = 0;
    let autoTimer = null;
    let isPaused = false;

    const updateStepWidth = () => {
      const firstItem = track.querySelector(".sponsor-item");
      if (!firstItem) return;
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.gap || style.columnGap || "0") || 0;
      itemWidth = firstItem.getBoundingClientRect().width + gap;
      track.style.transition = "none";
      track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
      track.offsetHeight;
      track.style.transition = "transform 0.55s ease";
    };

    const goToStep = (targetIndex, withTransition = true) => {
      if (!itemWidth) updateStepWidth();
      track.style.transition = withTransition ? "transform 0.55s ease" : "none";
      track.style.transform = `translateX(${-targetIndex * itemWidth}px)`;
      currentIndex = targetIndex;
    };

    const tick = () => {
      if (isPaused) return;
      goToStep(currentIndex + 1, true);
    };

    const startAuto = () => {
      if (autoTimer) clearInterval(autoTimer);
      autoTimer = window.setInterval(tick, 2600);
    };

    track.addEventListener("transitionend", (event) => {
      if (event.propertyName !== "transform") return;
      if (currentIndex < originalItems.length) return;
      goToStep(0, false);
    });

    banner.addEventListener("mouseenter", () => {
      isPaused = true;
    });
    banner.addEventListener("mouseleave", () => {
      isPaused = false;
    });
    banner.addEventListener("focusin", () => {
      isPaused = true;
    });
    banner.addEventListener("focusout", () => {
      isPaused = false;
    });

    window.addEventListener("resize", updateStepWidth);

    updateStepWidth();
    startAuto();
  });
};

const initCookieBanner = () => {
  const banner = document.querySelector("[data-cookie-banner]");
  if (!banner) return;

  const dismissed = localStorage.getItem(COOKIE_DISMISS_KEY) === "1";
  if (dismissed) return;

  banner.hidden = false;
  requestAnimationFrame(() => banner.classList.add("is-visible"));

  const dismissButton = banner.querySelector("[data-cookie-dismiss]");
  if (!dismissButton) return;

  dismissButton.addEventListener("click", () => {
    localStorage.setItem(COOKIE_DISMISS_KEY, "1");
    banner.classList.remove("is-visible");
    window.setTimeout(() => {
      banner.hidden = true;
    }, 260);
  });
};

const initMapConsent = () => {
  const mapLoadButtons = document.querySelectorAll("[data-map-load]");
  if (!mapLoadButtons.length) return;

  mapLoadButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const mapSrc = button.getAttribute("data-map-src");
      if (!mapSrc) return;

      const wrapper = button.closest("[data-map-consent]");
      if (!wrapper) return;

      const iframe = document.createElement("iframe");
      iframe.width = "100%";
      iframe.height = "400";
      iframe.src = mapSrc;
      iframe.frameBorder = "0";
      iframe.scrolling = "no";
      iframe.marginHeight = "0";
      iframe.marginWidth = "0";
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";

      wrapper.replaceWith(iframe);
    });
  });
};

const bootstrap = async () => {
  const includePaths = await loadPartials();
  initMobileMenu();
  initFaqAccordion();
  initSmoothScroll();
  initSponsorsBanner();
  initCookieBanner();
  initMapConsent();
  refreshPartialsInBackground(includePaths);
};

bootstrap();
