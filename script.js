document.addEventListener("DOMContentLoaded", function () {
    // Initial Setup
    const welcomeScreen = document.getElementById("welcome-screen");
    const homeScreen = document.getElementById("home-screen");
    const sections = document.querySelectorAll('.content-section');
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('.event-nav');
    const navClose = document.querySelector('.nav-close');
  
    // Hide all sections initially
    sections.forEach(section => section.style.display = 'none');
  
    // Welcome Screen Animation
    const languages = ["\u09B8\u09CD\u09AC\u09BE\u0997\u09A4\u09AE", "\u0938\u094D\u0935\u093E\u0917\u0924", "Welcome", "\u062E\u0648\u0634 \u0622\u0645\u062F\u06CC\u062F", "\u0BB5\u0BB0\u0BB5\u0BC7\u0B95\u0BCD\u0BB1\u0BBF\u0B95\u0BBF\u0BB1\u0BC7\u0BA9\u0BCD", "\u0C38\u0C4D\u0C35\u0C3E\u0C17\u0C24\u0C02"];
    let index = 0;
    
    function changeText() {
      document.getElementById("welcome-text").textContent = languages[index];
      document.getElementById("event-title").textContent = "ULLASH 2K25";
      index = (index + 1) % languages.length;
      setTimeout(changeText, 1500);
    }
    changeText();
  
    // Show Main Content
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
      } else {
        document.getElementById("days").textContent = Math.floor(difference / (1000 * 60 * 60 * 24));
        document.getElementById("hours").textContent = Math.floor((difference / (1000 * 60 * 60)) % 24);
        document.getElementById("minutes").textContent = Math.floor((difference / (1000 * 60)) % 60);
        document.getElementById("seconds").textContent = Math.floor((difference / 1000) % 60);
      }
    }
    const countdownInterval = setInterval(updateCountdown, 1000);
  
    // Mobile Menu Toggle
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  
    navClose.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        nav.classList.remove('active');
      }
    });
  
    // Show Section Functionality
    window.showSection = function(sectionId) {
      sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
      });
      nav.classList.remove('active');
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    };
  
    // Initialize default section
    setTimeout(() => showSection('day1-content'), 5100);
  });
  
  // Section Display Functions
  function showDay1() { showSection('day1-content'); }
  function showDay2() { showSection('day2-content'); }
  function showFoodRegistration() { showSection('food-registration-content'); }
  function showGallery() { showSection('gallery-content'); }
  function showContact() { showSection('contact-content'); }