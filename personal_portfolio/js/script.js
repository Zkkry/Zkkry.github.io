// 1. Mobile navigation (hamburger menu)
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
  });
}

// 2. Dark / light mode toggle
const themeButton = document.querySelector("#theme-toggle");
if (themeButton) {
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const darkModeIsOn = document.body.classList.contains("dark-mode");
    themeButton.textContent = darkModeIsOn ? "Light mode" : "Dark mode";
  });
}

// 3. Automatic copyright year
const yearElements = document.querySelectorAll(".current-year");
yearElements.forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// 4. Time-based greeting and typing effect (home page only)
const greeting = document.querySelector("#greeting");
if (greeting) {
  const hour = new Date().getHours();
  if (hour < 12) {
    greeting.textContent = "GOOD MORNING — WELCOME TO MY PORTFOLIO";
  } else if (hour < 18) {
    greeting.textContent = "GOOD AFTERNOON — WELCOME TO MY PORTFOLIO";
  } else {
    greeting.textContent = "GOOD EVENING — WELCOME TO MY PORTFOLIO";
  }
}

const typingElement = document.querySelector("#typing-text");
if (typingElement) {
  const phrases = ["Engineering Technology Student", "Future Engineering Technologist", "Problem Solver"];
  let phraseIndex = 0;
  let letterIndex = 0;
  let deleting = false;

  function typePhrase() {
    const currentPhrase = phrases[phraseIndex];
    typingElement.textContent = currentPhrase.substring(0, letterIndex);

    if (!deleting && letterIndex < currentPhrase.length) {
      letterIndex++;
      setTimeout(typePhrase, 85);
    } else if (deleting && letterIndex > 0) {
      letterIndex--;
      setTimeout(typePhrase, 40);
    } else {
      deleting = !deleting;
      if (!deleting) {
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
      setTimeout(typePhrase, 700);
    }
  }
  typePhrase();
}

// 5. About page: Read more / Read less
const readMoreButton = document.querySelector("#read-more");
const moreAbout = document.querySelector("#more-about");
if (readMoreButton && moreAbout) {
  readMoreButton.addEventListener("click", () => {
    const willShow = moreAbout.hidden;
    moreAbout.hidden = !willShow;
    readMoreButton.textContent = willShow ? "Read less" : "Read more";
    readMoreButton.setAttribute("aria-expanded", willShow);
  });
}

// 6. Projects page: filter cards using an array and loop
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

if (filterButtons.length && projectCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach((card) => {
        const matches = selectedCategory === "all" || card.dataset.category === selectedCategory;
        card.hidden = !matches;
      });
    });
  });
}

// 7. Contact form: client-side validation (does not send an email)
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const subject = document.querySelector("#subject").value.trim();
    const message = document.querySelector("#message").value.trim();
    const errorBox = document.querySelector("#form-error");
    const successBox = document.querySelector("#form-success");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    errorBox.textContent = "";
    successBox.textContent = "";

    if (!name || !email || !subject || !message) {
      errorBox.textContent = "Please complete all four fields.";
    } else if (!emailPattern.test(email)) {
      errorBox.textContent = "Please enter a valid email address.";
    } else {
      successBox.textContent = "Your form passed validation. Connect a form service to receive messages.";
      contactForm.reset();
    }
  });
}
