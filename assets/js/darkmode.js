/* ==========================================
   CodeVerse Learning Hub
   Dark Mode Controller
========================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.getElementById("theme-btn");
    const body = document.body;
    const icon = themeBtn ? themeBtn.querySelector("i") : null;

    /* Apply Saved Theme on Load */
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode", "dark");
        if (icon) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        }
    } else {
        body.classList.remove("dark-mode", "dark");
        if (icon) {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    }

    /* Toggle Theme Handler */
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            body.classList.toggle("dark");

            const isDark = body.classList.contains("dark-mode");

            if (isDark) {
                localStorage.setItem("theme", "dark");
                if (icon) {
                    icon.classList.remove("fa-moon");
                    icon.classList.add("fa-sun");
                }
            } else {
                localStorage.setItem("theme", "light");
                if (icon) {
                    icon.classList.remove("fa-sun");
                    icon.classList.add("fa-moon");
                }
            }
        });
    }
});