/* ===========================================
   CodeVerse Learning Hub
   Visitor Tracker & Community Analytics JS
   Author: CodeVerse Team
=========================================== */

"use strict";

(function () {
    // Core Visitor Stats Management
    const BASE_VISIT_COUNT = 1240; // Base baseline visits count
    const BASE_MEMBER_COUNT = 482; // Base baseline community members count

    // Initialize or Retrieve Visit Counts
    let visits = parseInt(localStorage.getItem("cv_total_visits") || "0", 10);
    if (!visits || isNaN(visits)) {
        visits = 1;
    } else {
        // Increment visit only once per session or page navigation
        if (!sessionStorage.getItem("cv_session_counted")) {
            visits++;
            sessionStorage.setItem("cv_session_counted", "true");
        }
    }
    localStorage.setItem("cv_total_visits", visits);

    const totalVisits = BASE_VISIT_COUNT + visits;

    // Today's Visits calculation
    let todayVisits = parseInt(localStorage.getItem("cv_today_visits") || "0", 10);
    const todayDateStr = new Date().toDateString();
    const lastVisitDate = localStorage.getItem("cv_last_visit_date");

    if (lastVisitDate !== todayDateStr) {
        todayVisits = 1;
        localStorage.setItem("cv_last_visit_date", todayDateStr);
    } else if (!sessionStorage.getItem("cv_today_counted")) {
        todayVisits++;
        sessionStorage.setItem("cv_today_counted", "true");
    }
    localStorage.setItem("cv_today_visits", todayVisits);

    // Active Learners (Dynamic Live Simulation: 14 to 28)
    const activeLearners = Math.floor(Math.random() * 15) + 14;

    // Community Members Count
    let extraMembers = parseInt(localStorage.getItem("cv_checkin_count") || "0", 10);
    const totalMembers = BASE_MEMBER_COUNT + extraMembers;

    // DOM Loaded Initialization
    document.addEventListener("DOMContentLoaded", () => {
        initStatsUI();
        initMemberCheckin();
        initFloatingWidget();
        initActivityTicker();
        initConfettiCanvas();
    });

    // 1. Update UI & Animate Numbers
    function initStatsUI() {
        updateElementText("total-visits-count", totalVisits.toLocaleString());
        updateElementText("hero-visits-count", totalVisits.toLocaleString());
        updateElementText("active-learners-count", activeLearners.toString());
        updateElementText("members-count", totalMembers.toLocaleString());
        updateElementText("today-visits-count", (42 + todayVisits).toString());

        // Widget text
        updateElementText("widget-visits", totalVisits.toLocaleString());
        updateElementText("widget-online", activeLearners.toString());
        updateElementText("widget-members", totalMembers.toLocaleString());
        updateElementText("widget-today", (42 + todayVisits).toString());

        // Trigger Counter Animations
        const counters = document.querySelectorAll(".counter-value");
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute("data-target") || counter.innerText.replace(/,/g, ""), 10);
            if (!isNaN(target) && target > 0) {
                animateCounter(counter, target);
            }
        });
    }

    function updateElementText(id, text) {
        const el = document.getElementById(id);
        if (el) {
            el.innerText = text;
        }
    }

    function animateCounter(el, target) {
        let start = 0;
        const duration = 1500;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                el.innerText = Math.floor(target).toLocaleString();
                clearInterval(timer);
            } else {
                el.innerText = Math.floor(start).toLocaleString();
            }
        }, stepTime);
    }

    // 2. Member Check-In & Badge Generator Logic
    function initMemberCheckin() {
        const checkinForm = document.getElementById("checkin-form");
        const storedMember = localStorage.getItem("cv_member_data");

        if (storedMember) {
            try {
                const member = JSON.parse(storedMember);
                renderMemberBadge(member);
            } catch (e) {
                console.error("Error parsing stored member", e);
            }
        }

        if (checkinForm) {
            checkinForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const nameInput = document.getElementById("member-name");
                const trackInput = document.getElementById("member-track");

                if (!nameInput || !nameInput.value.trim()) return;

                const name = nameInput.value.trim();
                const track = trackInput ? trackInput.value : "Full Stack Developer";
                
                // Save new checkin
                extraMembers++;
                localStorage.setItem("cv_checkin_count", extraMembers);

                const memberID = `#CV-${BASE_MEMBER_COUNT + extraMembers}`;
                const memberData = {
                    name: name,
                    track: track,
                    id: memberID,
                    checkinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    avatarIcon: getAvatarIcon(track)
                };

                localStorage.setItem("cv_member_data", JSON.stringify(memberData));
                renderMemberBadge(memberData);
                updateElementText("members-count", (BASE_MEMBER_COUNT + extraMembers).toLocaleString());
                updateElementText("widget-members", (BASE_MEMBER_COUNT + extraMembers).toLocaleString());

                // Trigger celebration confetti
                triggerConfetti();

                // Add to ticker
                addTickerItem(name, track);
            });
        }
    }

    function getAvatarIcon(track) {
        if (track.includes("Python")) return "fa-python";
        if (track.includes("Web") || track.includes("HTML")) return "fa-code";
        if (track.includes("C ")) return "fa-terminal";
        if (track.includes("SQL") || track.includes("Data")) return "fa-database";
        return "fa-user-graduate";
    }

    function renderMemberBadge(member) {
        const passName = document.getElementById("pass-member-name");
        const passTrack = document.getElementById("pass-member-track");
        const passID = document.getElementById("pass-member-id");
        const passAvatar = document.getElementById("pass-avatar-icon");
        const passDate = document.getElementById("pass-date");

        if (passName) passName.innerText = member.name;
        if (passTrack) passTrack.innerText = member.track;
        if (passID) passID.innerText = member.id;
        if (passDate) passDate.innerText = member.checkinDate;
        if (passAvatar) {
            passAvatar.className = `fa-brands ${member.avatarIcon || 'fa-code'}`;
        }
    }

    // 3. Floating Widget Controls
    function initFloatingWidget() {
        const trigger = document.getElementById("widget-trigger");
        const popover = document.getElementById("widget-popover");
        const closeBtn = document.getElementById("popover-close");

        if (trigger && popover) {
            trigger.addEventListener("click", (e) => {
                e.stopPropagation();
                popover.classList.toggle("active");
            });

            if (closeBtn) {
                closeBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    popover.classList.remove("active");
                });
            }

            document.addEventListener("click", (e) => {
                if (!popover.contains(e.target) && !trigger.contains(e.target)) {
                    popover.classList.remove("active");
                }
            });
        }
    }

    // 4. Live Activity Ticker Feed
    function initActivityTicker() {
        const tickerContent = document.getElementById("ticker-content");
        if (!tickerContent) return;

        const sampleActivities = [
            { name: "Rahul S.", track: "Python Masterclass", time: "2m ago" },
            { name: "Sravani S.", track: "HTML & CSS Roadmap", time: "5m ago" },
            { name: "Ananya K.", track: "JavaScript Essentials", time: "12m ago" },
            { name: "Vikram P.", track: "C Programming", time: "18m ago" },
            { name: "Priya M.", track: "SQL & Data Analytics", time: "25m ago" }
        ];

        let html = "";
        // Duplicate array for seamless infinite scroll ticker loop
        [...sampleActivities, ...sampleActivities].forEach(act => {
            html += `
                <div class="ticker-item">
                    <i class="fa-solid fa-circle-check" style="color:#22c55e;"></i>
                    <strong>${act.name}</strong> checked in to <span>${act.track}</span>
                    <small style="opacity:0.6;">• ${act.time}</small>
                </div>
            `;
        });

        tickerContent.innerHTML = html;
    }

    function addTickerItem(name, track) {
        const tickerContent = document.getElementById("ticker-content");
        if (!tickerContent) return;

        const newItem = `
            <div class="ticker-item" style="color: #2563eb; font-weight: 600;">
                <i class="fa-solid fa-star" style="color:#f59e0b;"></i>
                <strong>${name}</strong> just joined as <span>${track}</span>
                <small style="opacity:0.6;">• Just now</small>
            </div>
        `;
        tickerContent.insertAdjacentHTML("afterbegin", newItem);
    }

    // 5. Canvas Confetti System
    let confettiCanvas;
    let ctx;
    let particles = [];

    function initConfettiCanvas() {
        confettiCanvas = document.createElement("canvas");
        confettiCanvas.id = "confetti-canvas";
        document.body.appendChild(confettiCanvas);
        ctx = confettiCanvas.getContext("2d");

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
    }

    function resizeCanvas() {
        if (confettiCanvas) {
            confettiCanvas.width = window.innerWidth;
            confettiCanvas.height = window.innerHeight;
        }
    }

    function triggerConfetti() {
        if (!confettiCanvas) initConfettiCanvas();

        const colors = ["#2563eb", "#3b82f6", "#60a5fa", "#22c55e", "#f59e0b", "#ec4899", "#8b5cf6"];
        for (let i = 0; i < 90; i++) {
            particles.push({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                vx: (Math.random() - 0.5) * 16,
                vy: (Math.random() - 0.7) * 16,
                size: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rSpeed: (Math.random() - 0.5) * 10,
                opacity: 1
            });
        }

        renderConfetti();
    }

    function renderConfetti() {
        if (particles.length === 0) return;

        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.3; // Gravity
            p.opacity -= 0.015;
            p.rotation += p.rSpeed;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = Math.max(p.opacity, 0);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();

            if (p.opacity <= 0 || p.y > window.innerHeight) {
                particles.splice(i, 1);
            }
        }

        if (particles.length > 0) {
            requestAnimationFrame(renderConfetti);
        } else {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        }
    }

    // Expose global tracker helper if needed
    window.CodeVerseTracker = {
        triggerConfetti: triggerConfetti
    };
})();
