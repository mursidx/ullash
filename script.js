document.addEventListener("DOMContentLoaded", function () {
    // Initial Setup
    const welcomeScreen = document.getElementById("welcome-screen");
    const homeScreen = document.getElementById("home-screen");
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
  
    tabContents.forEach(content => {
      if (!content.classList.contains('active')) {
        content.style.display = 'none';
      }
    });
  
    const languages = [
      "\u09B8\u09CD\u09AC\u09BE\u0997\u09A4\u09AE",
      "\u0938\u094D\u0935\u093E\u0917\u0924",
      "Welcome",
      "\u062E\u0648\u0634 \u0622\u0645\u062F\u06CC\u062F",
      "\u0BB5\u0BB0\u0BB5\u0BC7\u0B95\u0BCD\u0BB1\u0BBF\u0B95\u0BBF\u0BB1\u0BC7\u0BA9\u0BCD",
      "\u0C38\u0C4D\u0C35\u0C3E\u0C17\u0C24\u0C02"
    ];
    let index = 0;
  
    function changeText() {
      document.getElementById("welcome-text").textContent = languages[index];
      document.getElementById("event-title").textContent = "ULLASH 2K25";
      index = (index + 1) % languages.length;
      setTimeout(changeText, 1500);
    }
    changeText();
  
    setTimeout(() => {
      welcomeScreen.style.opacity = "0";
      setTimeout(() => {
        welcomeScreen.style.display = "none";
        homeScreen.style.display = "block";
      }, 1000);
    }, 5000);
  
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
  
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => {
          content.style.display = 'none';
          content.classList.remove('active');
        });
  
        button.classList.add('active');
        const tabId = button.dataset.tab;
        const activeTab = document.getElementById(tabId);
        activeTab.style.display = 'block';
        activeTab.classList.add('active');
  
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  
    // Modal Gallery Slider
    const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeModal = document.querySelector('.close');
    const prevBtn = document.getElementById('prevImage');
    const nextBtn = document.getElementById('nextImage');
    let currentIndex = 0;
  
    function showImage(index) {
      currentIndex = index;
      modalImg.src = galleryImages[currentIndex].src;
      modal.style.display = "block";
    }
  
    galleryImages.forEach((img, idx) => {
      img.addEventListener('click', () => showImage(idx));
    });
  
    closeModal.addEventListener('click', () => {
      modal.style.display = "none";
    });
  
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      showImage(currentIndex);
    });
  
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      showImage(currentIndex);
    });
  
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  
    document.addEventListener('keydown', (e) => {
      if (modal.style.display === "block") {
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "Escape") closeModal.click();
      }
    });
  });
  