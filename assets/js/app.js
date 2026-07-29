/* ===========================================
   CodeVerse Learning Hub
   Main JavaScript File
   Author : Sravani Sagabala
=========================================== */

"use strict";

/* ===========================================
   WEBSITE LOADER
=========================================== */

window.addEventListener("load", () => {
    console.log("✅ CodeVerse Learning Hub Loaded Successfully");
});


/* ===========================================
   ACTIVE NAVIGATION LINK
=========================================== */

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    if (link.href === window.location.href) {

        link.classList.add("active");

    }

});


/* ===========================================
   SMOOTH SCROLL
=========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


/* ===========================================
   SCROLL TO TOP BUTTON
=========================================== */

const topButton = document.createElement("button");

topButton.innerHTML = "↑";

topButton.id = "topBtn";

document.body.appendChild(topButton);


window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});


topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ===========================================
   CURRENT YEAR IN FOOTER
=========================================== */

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}


/* ===========================================
   WELCOME MESSAGE
=========================================== */

const welcomeMessage = () => {

    console.log("👋 Welcome to CodeVerse Learning Hub");

};

welcomeMessage();


/* ===========================================
   CARD HOVER ANIMATION
=========================================== */

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});


/* ===========================================
   PAGE VISIT COUNTER
=========================================== */

let visits = localStorage.getItem("visits");

if (!visits) {

    visits = 0;

}

visits++;

localStorage.setItem("visits", visits);

console.log("Total Visits :", visits);


/* ===========================================
   BUTTON RIPPLE EFFECT
=========================================== */

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.add("clicked");

        setTimeout(() => {

            button.classList.remove("clicked");

        }, 300);

    });

});


/* ===========================================
   SIMPLE FADE-IN ANIMATION
=========================================== */

const revealElements = document.querySelectorAll("section");

const reveal = () => {

    revealElements.forEach(section => {

        const windowHeight = window.innerHeight;

        const sectionTop = section.getBoundingClientRect().top;

        const revealPoint = 120;

        if (sectionTop < windowHeight - revealPoint) {

            section.classList.add("show");

        }

    });

};

window.addEventListener("scroll", reveal);

reveal();


/* ===========================================
   END OF FILE
=========================================== */