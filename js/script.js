(function () {
  "use strict";

  /* Header background on scroll */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile nav toggle */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  navToggle.addEventListener("click", function () {
    var isOpen = mainNav.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mainNav.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* Scroll reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            setTimeout(function () {
              el.classList.add("in");
            }, (i % 6) * 60);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* Contact form -> mailto */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  var CONTACT_EMAIL = "Julesarrr@icloud.com";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var projectType = form.projectType.value;
    var message = form.message.value.trim();

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      note.textContent = "Merci de remplir tous les champs obligatoires.";
      note.className = "form-note error";
      return;
    }
    if (!emailPattern.test(email)) {
      note.textContent = "Merci d'indiquer une adresse email valide.";
      note.className = "form-note error";
      return;
    }

    var subject = "Nouveau projet (" + projectType + ") — " + name;
    var body =
      "Nom : " + name + "\n" +
      "Email : " + email + "\n" +
      "Type de projet : " + projectType + "\n\n" +
      "Message :\n" + message;

    var mailtoLink =
      "mailto:" + CONTACT_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    window.location.href = mailtoLink;

    note.textContent = "Votre client email va s'ouvrir avec le message pré-rempli. Il ne reste plus qu'à l'envoyer !";
    note.className = "form-note success";
    form.reset();
  });
})();
