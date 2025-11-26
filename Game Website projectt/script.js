let navbar = document.querySelector('.header .flex .navbar');
let menubtn = document.querySelector('#menu-btn');
let header = document.querySelector('.header');

menubtn.onclick = () => {
    navbar.classList.toggle('active');
    menubtn.classList.toggle('fa-times');
}

window.onscroll = () => {
    navbar.classList.remove('active');
    menubtn.classList.remove('fa-times');

    if (window.scrollY > 0) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
}

// FAQ toggle system
let faqBox = document.querySelectorAll('.faq .box-container .box');

faqBox.forEach(box => {
    box.onclick = () => {
        let content = box.querySelector('.content');
        let icon = box.querySelector('i');

        document.querySelectorAll('.faq .box-container .box .content').forEach(contents => {
            contents.classList.remove('active');
        });

        document.querySelectorAll('.faq .box-container .box i').forEach(icons => {
            icons.classList.replace('fa-minus', 'fa-plus');
        });

        content.classList.toggle('active');
        icon.classList.toggle('fa-minus');
        icon.classList.toggle('fa-plus');
    }
});

// Dummy leaderboard loader (ignore errors)
async function fetchTopPlayers() {
    try {
        const response = await fetch('/api/top-players');
        const players = await response.json();
        const playersList = document.getElementById("players-list");
        if (!playersList) return;
        playersList.innerHTML = "";

        players.forEach(player => {
            const div = document.createElement("div");
            div.classList.add("player");
            div.innerHTML = `<span>${player.username}</span> <span>Score: ${player.score}</span>`;
            playersList.appendChild(div);
        });
    } catch (error) {
        console.log("Leaderboard API not set (this is normal if you didn't create it).");
    }
}

fetchTopPlayers();


// ===============================
// FIXED FEEDBACK SYSTEM
// ===============================

const feedbackForm = document.getElementById('feedbackForm');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = feedbackForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Submitting...";
        submitBtn.disabled = true;

        fetch("feedback.php", {
            method: "POST",
            body: new FormData(feedbackForm)
        })
        .then(response => response.text())
        .then(data => {
            console.log("Server:", data);

            const [status, title, message] = data.split("||");

            // Remove old toast
            document.querySelectorAll(".feedback-toast").forEach(el => el.remove());

            // Create new toast
            const box = document.createElement("div");
            box.className = "feedback-toast";
            box.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: ${status === "SUCCESS" ? "#24226fff" : "#b351c6ff"};
                color: white;
                padding: 12px 18px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0,0,0,.5);
                z-index: 9999;
                font-size: 16px;
                opacity: 0;
                transition: .4s;
            `;

            box.innerHTML = `<strong>${title}</strong><br>${message}`;
            document.body.appendChild(box);

            setTimeout(() => box.style.opacity = 1, 100);
            setTimeout(() => {
                box.style.opacity = 0;
                setTimeout(() => box.remove(), 400);
            }, 4000);

            if (status === "SUCCESS") feedbackForm.reset();
        })
        .catch(error => {
            console.error(error);
            alert("Feedback system error. Check connection or PHP.");
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}
