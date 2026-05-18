// FADE ANIMATION

const fadeElements = document.querySelectorAll(".fade-up");

if (fadeElements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  fadeElements.forEach((el) => {
    observer.observe(el);
  });
}

// HEADER SHADOW

window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");

  if (!header) return;

  if (window.scrollY > 50) {
    header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
  } else {
    header.style.boxShadow = "none";
  }
});

// MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// MODAL

const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const modal = document.getElementById("contactModal");

if (openModal && closeModal && modal) {
  openModal.addEventListener("click", (e) => {
    e.preventDefault();

    modal.classList.add("active");
  });

  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}

// FACILITY FILTER

const regionSelect = document.getElementById("regionSelect");

const serviceSelect = document.getElementById("serviceSelect");

const facilityCards = document.querySelectorAll(".facility-card");

if (regionSelect && serviceSelect && facilityCards.length > 0) {
  function filterFacilities() {
    const regionValue = regionSelect.value;
    const serviceValue = serviceSelect.value;

    facilityCards.forEach((card) => {
      const region = card.dataset.region;
      const service = card.dataset.service;

      const regionMatch = regionValue === "all" || region === regionValue;

      const serviceMatch = serviceValue === "all" || service === serviceValue;

      if (regionMatch && serviceMatch) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  regionSelect.addEventListener("change", filterFacilities);

  serviceSelect.addEventListener("change", filterFacilities);
}

// CONTACT FORM

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector("button");

    submitButton.innerText = "送信中...";
    submitButton.disabled = true;

    setTimeout(() => {
      alert("お問い合わせありがとうございます。");

      contactForm.reset();

      submitButton.innerText = "送信する";
      submitButton.disabled = false;
    }, 1500);
  });
}
