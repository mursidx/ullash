document.addEventListener("DOMContentLoaded", function () {
    const welcomeScreen = document.getElementById("welcome-screen");
    const homeScreen = document.getElementById("home-screen");
    const welcomeText = document.getElementById("welcome-text");
    const eventTitle = document.getElementById("event-title");
    const day1Content = document.getElementById("day1-content");
    const day2Content = document.getElementById("day2-content");
    const countdownContainer = document.getElementById("countdown-container");

    // Hide all sections initially
    day1Content.style.display = "none";
    day2Content.style.display = "none";
    document.getElementById("food-registration-content").style.display = "none";
    document.getElementById("gallery-content").style.display = "none";
    document.getElementById("contact-content").style.display = "none";

    // Multilingual Welcome Text Animation
    const languages = ["\u09B8\u09CD\u09AC\u09BE\u0997\u09A4\u09AE", "\u0938\u094D\u0935\u093E\u0917\u0924", "Welcome", "\u062E\u0648\u0634 \u0622\u0645\u062F\u06CC\u062F", "\u0BB5\u0BB0\u0BB5\u0BC7\u0B95\u0BCD\u0BB1\u0BBF\u0B95\u0BBF\u0BB1\u0BC7\u0BA9\u0BCD", "\u0C38\u0C4D\u0C35\u0C3E\u0C17\u0C24\u0C02"];
    const ullashNames = ["ULLASH 2K25", "ULLASH 2K25", "ULLASH 2K25", "ULLASH 2K25", "ULLASH 2K25", "ULLASH 2K25"];

    let index = 0;
    function changeText() {
        welcomeText.textContent = languages[index];
        eventTitle.textContent = ullashNames[index];
        index = (index + 1) % languages.length;
        setTimeout(changeText, 1500);
    }
    changeText();

    // Hide Welcome Screen & Show Home Screen
    setTimeout(() => {
        welcomeScreen.style.opacity = "0";
        setTimeout(() => {
            welcomeScreen.style.display = "none";
            homeScreen.style.display = "block";
        }, 1000);
    }, 5000);

    // Countdown Timer
    function updateCountdown() {
        const eventDate = new Date("May 14, 2025 00:00:00").getTime();
        const now = new Date().getTime();
        const difference = eventDate - now;

        if (difference <= 0) {
            document.getElementById("countdown").innerHTML = "<span class='event-started'>Event Started!</span>";
            clearInterval(countdownInterval);
            countdownContainer.style.animation = "pulse 2s infinite";
        } else {
            document.getElementById("days").textContent = Math.floor(difference / (1000 * 60 * 60 * 24));
            document.getElementById("hours").textContent = Math.floor((difference / (1000 * 60 * 60)) % 24);
            document.getElementById("minutes").textContent = Math.floor((difference / (1000 * 60)) % 60);
            document.getElementById("seconds").textContent = Math.floor((difference / 1000) % 60);
        }
    }
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Title Hover Effect: Add a glowing effect on hover
    eventTitle.addEventListener("mouseover", () => {
        eventTitle.style.textShadow = "0 0 20px rgba(255, 255, 255, 0.8)";
    });
    eventTitle.addEventListener("mouseout", () => {
        eventTitle.style.textShadow = "none";
    });
});

// Function to toggle visibility of sections
function toggleVisibility(sectionId) {
    const sections = [
        "day1-content",
        "day2-content",
        "food-registration-content",
        "gallery-content",
        "contact-content"
    ];

    sections.forEach(id => {
        const section = document.getElementById(id);
        if (id === sectionId) {
            if (section.style.display === "none" || section.style.display === "") {
                section.style.display = "block";
                section.style.opacity = "0";
                setTimeout(() => {
                    section.style.opacity = "1";
                }, 50);
                section.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            section.style.opacity = "0";
            setTimeout(() => {
                section.style.display = "none";
            }, 300);
        }
    });
}

// Function to show Day 1 Content
function showDay1() {
    toggleVisibility("day1-content");
}

// Function to show Day 2 Content
function showDay2() {
    toggleVisibility("day2-content");
}

// Function to show Food Registration
function showFoodRegistration() {
    toggleVisibility("food-registration-content");
}

// Function to show Gallery Section
function showGallery() {
    toggleVisibility("gallery-content");
}

// Function to show Contact Us Section
function showContact() {
    toggleVisibility("contact-content");
}

// Lightbox Feature for Enlarged Image View
function openLightbox(imageSrc) {
    document.getElementById("lightbox-img").src = imageSrc;
    document.getElementById("lightbox").style.display = "flex";
}

// Close Lightbox
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// Function to toggle mobile navigation menu
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}
// Function to show Contact Us section like Day 1 & Food Registration
function showContactUs() {
    document.getElementById("day1-content").style.display = "none";
    document.getElementById("day2-content").style.display = "none";
    document.getElementById("food-registration-content").style.display = "none";
    document.getElementById("gallery-content").style.display = "none";
    document.getElementById("contact-us-content").style.display = "block";
}
