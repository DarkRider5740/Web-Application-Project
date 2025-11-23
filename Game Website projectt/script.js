let navbar=document.querySelector('.header .flex .navbar');
let menubtn=document.querySelector('#menu-btn');
let header =document.querySelector('.header');

menubtn.onclick=()=> {
    navbar.classList.toggle('active');
    menubtn.classList.toggle('fa-times');

}
window.onscroll=()=>{
    navbar.classList.remove('active');
    menubtn.classList.remove('fa-times');

if(window.scrollY>0){
    header.classList.add('active');
}else{
    header.classList.remove('active');
}


}

let faqBox = document.querySelectorAll('.faq .box-container .box');

faqBox.forEach(box => {
    box.onclick = () => {
        let content = box.querySelector('.content');
        let icon = box.querySelector('i');

        // Remove 'active' class from all contents and reset icons
        document.querySelectorAll('.faq .box-container .box .content').forEach(contents => {
            contents.classList.remove('active');
        });

        document.querySelectorAll('.faq .box-container .box i').forEach(icons => {
            icons.classList.replace('fa-minus', 'fa-plus');
        });

        // Toggle the current box
        content.classList.toggle('active');
        if (icon.classList.contains('fa-minus')) {
            icon.classList.replace('fa-minus', 'fa-plus');
        } else {
            icon.classList.replace('fa-plus', 'fa-minus');
        }
        
    }
});
document.querySelectorAll('.box a').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Navigating to:', link.href);
    });
});


async function fetchTopPlayers() {
    try {
        const response = await fetch('/api/top-players'); // Change this URL based on your backend
        const players = await response.json();
        const playersList = document.getElementById("players-list");
        playersList.innerHTML = ""; // Clear previous content
        
        players.forEach(player => {
            const div = document.createElement("div");
            div.classList.add("player");
            div.innerHTML = `<span>${player.username}</span> <span>Score: ${player.score}</span>`;
            playersList.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching players:", error);
        document.getElementById("players-list").innerHTML = "Error loading players.";
    }
}

fetchTopPlayers();
// Feedback Form Handling
const feedbackForm = document.getElementById('feedbackForm');
const feedbackMessage = document.getElementById('feedback-message');

function hideFeedbackMessage() {
    feedbackMessage.style.display = 'none';
}

if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = feedbackForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        // Submit form via fetch
        fetch('feedback.php', {
            method: 'POST',
            body: new FormData(feedbackForm)
        })
        .then(response => response.text())
        .then(data => {
            // Check if the response contains our success message
            if (data.includes('thankyou for your feedback')) {
                // Show success message
                feedbackMessage.style.display = 'block';
                // Reset form
                feedbackForm.reset();
                // Scroll to message
                feedbackMessage.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Show error from server
                alert('Error submitting feedback. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your feedback. Please try again.');
        })
        .finally(() => {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}

then(data => {
    const [status, title, message] = data.split('||');
    
    if (status === 'SUCCESS') {
        // Update the message elements
        const messageTitle = feedbackMessage.querySelector('h3');
        const messageText = feedbackMessage.querySelector('p');
        
        messageTitle.textContent = title;
        messageText.textContent = message;
        
        // Show success message
        feedbackMessage.style.display = 'block';
        feedbackForm.reset();
        feedbackMessage.scrollIntoView({ behavior: 'smooth' });
    } else {
        alert(`${title}\n${message}`);
    }
})

