/* ===========================================
   CodeVerse Learning Hub
   Search Functionality
=========================================== */

"use strict";

/* ===========================================
   Search Elements
=========================================== */

const searchInput = document.getElementById("search");
const languageCards = document.querySelectorAll(".card");
const cardContainer = document.querySelector(".card-container");

/* ===========================================
   No Result Message
=========================================== */

const noResult = document.createElement("h3");

noResult.textContent = "❌ No language found.";
noResult.style.textAlign = "center";
noResult.style.marginTop = "20px";
noResult.style.display = "none";

if (cardContainer) {
    cardContainer.after(noResult);
}

/* ===========================================
   Search Function
=========================================== */

function searchLanguages() {

    if (!searchInput) return;

    const searchValue = searchInput.value.toLowerCase().trim();

    let found = false;

    languageCards.forEach(card => {

        const heading = card.querySelector("h3");

        if (!heading) return;

        const title = heading.textContent.toLowerCase();

        if (title.includes(searchValue)) {

            card.style.display = "";
            found = true;

        } else {

            card.style.display = "none";

        }

    });

    noResult.style.display = found ? "none" : "block";
}

/* ===========================================
   Search While Typing
=========================================== */

if (searchInput) {
    searchInput.addEventListener("keyup", searchLanguages);
}