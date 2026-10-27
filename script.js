const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open", !expanded);
    document.body.classList.toggle("menu-open", !expanded);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// Staggered reveal animation for content sections. Content remains visible if JS is unavailable.
const staggerGroup = ".project-card, .service-row, .fact, .timeline-item, .faq-item, .contact-wrap > *";
const revealItems = document.querySelectorAll(`.section-heading, .clients, .about-photo, .about-copy, .toolbox, ${staggerGroup}`);
if ("IntersectionObserver" in window && !reduceMotion) {
  revealItems.forEach((item) => {
    const index = [...item.parentElement.children].filter((child) => child.matches(staggerGroup)).indexOf(item);
    item.classList.add("reveal-ready");
    if (index > 0) item.style.transitionDelay = `${Math.min(index, 5) * 0.09}s`;
    // Drop the delay once revealed so hover effects stay instant.
    item.addEventListener("transitionend", () => { item.style.transitionDelay = ""; }, { once: true });
  });
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
}

// Glass header and scroll progress bar.
const header = document.querySelector(".site-header");
const progress = document.querySelector(".scroll-progress");
const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.setProperty("--progress", max > 0 ? window.scrollY / max : 0);
  if (header) header.classList.toggle("is-scrolled", window.scrollY > 20);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Typewriter rotation for the hero headline.
const rotator = document.querySelector("[data-rotate]");
if (rotator && !reduceMotion) {
  const words = rotator.dataset.rotate.split("|");
  let wordIndex = 0;
  let charCount = words[0].length;
  let deleting = true;
  const tick = () => {
    charCount += deleting ? -1 : 1;
    rotator.textContent = words[wordIndex].slice(0, charCount);
    if (deleting && charCount === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    } else if (!deleting && charCount === words[wordIndex].length) {
      deleting = true;
      setTimeout(tick, 2400);
      return;
    }
    setTimeout(tick, deleting ? 55 : 95);
  };
  setTimeout(tick, 2600);
}

// Animated counters for numeric facts such as "4+" and "360°".
if ("IntersectionObserver" in window && !reduceMotion) {
  const counterObserver = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      activeObserver.unobserve(entry.target);
      const match = entry.target.textContent.match(/^(\d+)(.*)$/);
      if (!match) return;
      const target = Number(match[1]);
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / 1400, 1);
        entry.target.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))) + match[2];
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".fact b").forEach((counter) => counterObserver.observe(counter));
}

if (finePointer && !reduceMotion) {
  // Cursor glow and trailing ring.
  document.body.classList.add("has-cursor");
  const glow = document.querySelector(".cursor-glow");
  const ring = document.querySelector(".cursor-ring");
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  window.addEventListener("pointermove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    glow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }, { passive: true });
  const followRing = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(followRing);
  };
  followRing();
  document.querySelectorAll("a, button, summary, .project-card, .service-row").forEach((el) => {
    el.addEventListener("pointerenter", () => ring.classList.add("is-active"));
    el.addEventListener("pointerleave", () => ring.classList.remove("is-active"));
  });

  // 3D parallax for the hero illustration.
  const hero = document.querySelector(".hero");
  const heroArt = document.querySelector(".hero-art");
  if (hero && heroArt) {
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      heroArt.style.setProperty("--px", px.toFixed(3));
      heroArt.style.setProperty("--py", py.toFixed(3));
      heroArt.style.setProperty("--tilt-x", `${(-py * 14).toFixed(2)}deg`);
      heroArt.style.setProperty("--tilt-y", `${(px * 18).toFixed(2)}deg`);
    });
    hero.addEventListener("pointerleave", () => {
      ["--px", "--py", "--tilt-x", "--tilt-y"].forEach((prop) => heroArt.style.removeProperty(prop));
    });
  }

  // Tilt and glare on project cards.
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty("--rx", `${((0.5 - y) * 7).toFixed(2)}deg`);
      card.style.setProperty("--ry", `${((x - 0.5) * 9).toFixed(2)}deg`);
      card.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
      card.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--rx");
      card.style.removeProperty("--ry");
    });
  });

  // Magnetic buttons.
  document.querySelectorAll(".button, .nav-cta").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      button.style.translate = `${dx * 0.25}px ${dy * 0.35}px`;
    });
    button.addEventListener("pointerleave", () => { button.style.translate = ""; });
  });
}

// Interactive particle network behind the hero.
const canvas = document.querySelector(".hero-canvas");
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext("2d");
  const pointer = { x: -9999, y: -9999 };
  let particles = [];
  let width = 0;
  let height = 0;
  let running = false;

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(Math.round((width * height) / 13000), 85);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6,
      lime: Math.random() < 0.25,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (!reduceMotion) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(155, 140, 255, ${0.16 * (1 - dist / 120)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
      const pointerDist = Math.hypot(p.x - pointer.x, p.y - pointer.y);
      if (pointerDist < 170) {
        ctx.strokeStyle = `rgba(197, 255, 115, ${0.35 * (1 - pointerDist / 170)})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(pointer.x, pointer.y);
        ctx.stroke();
      }
      ctx.fillStyle = p.lime ? "rgba(197, 255, 115, 0.8)" : "rgba(185, 175, 255, 0.7)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (running) requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener("resize", () => {
    resize();
    if (!running) draw();
  });
  canvas.parentElement.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
  });
  canvas.parentElement.addEventListener("pointerleave", () => { pointer.x = pointer.y = -9999; });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    draw();
  } else {
    // Only animate while the hero is on screen.
    new IntersectionObserver(([entry]) => {
      const wasRunning = running;
      running = entry.isIntersecting;
      if (running && !wasRunning) requestAnimationFrame(draw);
    }).observe(canvas);
  }
}

// Résumé links: until resume.pdf is uploaded, turn them into an email request instead of a broken download.
const resumeLinks = document.querySelectorAll("[data-resume]");
if (resumeLinks.length) {
  const useRequestFallback = () => {
    resumeLinks.forEach((link) => {
      link.removeAttribute("download");
      link.href = "mailto:sreedher002@gmail.com?subject=" + encodeURIComponent("Résumé request") + "&body=" + encodeURIComponent("Hi Sreedher, could you please share your résumé?");
      link.firstChild.textContent = "Request résumé ";
      const icon = link.querySelector("span");
      if (icon) icon.textContent = "↗";
    });
  };
  fetch("resume.pdf", { method: "HEAD", cache: "no-store" })
    .then((response) => { if (!response.ok) useRequestFallback(); })
    .catch(useRequestFallback);
}
