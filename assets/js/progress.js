/* ==========================================
   CodeVerse Learning Hub
   Progress Tracker
   Author : Sravani Sagabala
==========================================*/

"use strict";

/* ==========================================
   Save Progress
==========================================*/

function saveProgress(language, percentage) {

    localStorage.setItem(language, percentage);

    loadProgress();

}


/* ==========================================
   Load Progress
==========================================*/

function loadProgress() {

    const progressBars = document.querySelectorAll(".progress-fill");

    progressBars.forEach(bar => {

        const language = bar.dataset.language;

        const value = localStorage.getItem(language) || 0;

        bar.style.width = value + "%";

        const text = bar.parentElement.nextElementSibling;

        if (text) {

            text.innerHTML = value + "% Completed";

        }

    });

}


/* ==========================================
   Complete Course Button
==========================================*/

const completeButtons = document.querySelectorAll(".complete-btn");

completeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const language = button.dataset.language;

        saveProgress(language, 100);

        alert(language + " Course Completed 🎉");

    });

});


/* ==========================================
   Reset Progress
==========================================*/

const resetButton = document.getElementById("reset-progress");

if (resetButton) {

    resetButton.addEventListener("click", () => {

        if (confirm("Reset all learning progress?")) {

            localStorage.clear();

            loadProgress();

        }

    });

}


/* ==========================================
   Load on Page Open
==========================================*/

window.addEventListener("load", loadProgress);