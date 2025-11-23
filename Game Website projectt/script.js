// Navbar
let navbar = document.querySelector('.header .flex .navbar');
let menubtn = document.querySelector('#menu-btn');
let header = document.querySelector('.header');

menubtn.onclick = () => {
    navbar.classList.toggle('active');
    menubtn.classList.toggle('fa-times');
};

window.onscroll = () => {
    navbar.classList.remove('active');
    menubtn.classList.remove('fa-times');

    if (window.scrollY > 0) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
};

// FAQ
let faqBox = document.querySelectorAll('.faq .box-container .box');

faqBox.forEach(box => {
    box.onclick = () => {
        let content = box.querySelector('.content');
        let icon = box.querySelector('i');

        document.querySelectorAll('.faq .box-container .box .content').forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.faq .box-container .box i').forEach(i => i.classList.replace('fa-minus', 'fa-plus'));

        content.classList.toggle('active');
        icon.classList.toggle('fa-minus');
        icon.classList.toggle('fa-plus');
    };
});

// FEEDBACK PREVIEW (NO DATABASE)
const feedbackForm = document.getElementById('feedbackForm');
const feedbackMessage = document.getElementById('feedback-message');

function hideFeedbackMessage() {
    feedbackMessage.style.display = 'none';
}

if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get values
        let name = feedbackForm.querySelector('input[name="name"]').value;
        let rating = feedbackForm.querySelector('select[name="rating"]').value;
        let message = feedbackForm.querySelector('textarea[name="message"]').value;

        // Insert into message box
        const title = feedbackMessage.querySelector('h3');
        const text = feedbackMessage.querySelector('p');

        title.textContent = "Your Feedback";
        text.innerHTML = `
            <strong>Name:</strong> ${name}<br>
            <strong>Rating:</strong> ${rating}<br><br>
            <strong>Message:</strong><br>${message}
        `;

        // Show it
        feedbackMessage.style.display = 'block';
        feedbackForm.reset();
        feedbackMessage.scrollIntoView({ behavior: 'smooth' });
    });
}
