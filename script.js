document.addEventListener("DOMContentLoaded", function () {
    // Initial Setup
    const welcomeScreen = document.getElementById("welcome-screen");
    const homeScreen = document.getElementById("home-screen");
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Hide all tab contents except first
    tabContents.forEach(content => {
      if (!content.classList.contains('active')) {
        content.style.display = 'none';
      }
    });
    
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
    updateCountdown(); // Initialize countdown immediately
    
    // Tab Functionality
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => {
          content.style.display = 'none';
          content.classList.remove('active');
        });
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const tabId = button.dataset.tab;
        const activeTab = document.getElementById(tabId);
        activeTab.style.display = 'block';
        activeTab.classList.add('active');
        
        // If gallery tab is clicked, initialize gallery if not already done
        if (tabId === 'gallery-content' && !galleryInitialized) {
          initializeGallery();
        }
        
        // Smooth scroll to top of content
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    
    // Gallery Variables
    let galleryInitialized = false;
    let currentPage = 1;
    const imagesPerPage = 12;
    const totalImages = 103;
    const totalPages = Math.ceil(totalImages / imagesPerPage);
    let currentModalIndex = 0;
    
    // Gallery Functions
    function initializeGallery() {
      if (galleryInitialized) return;
      
      const galleryGrid = document.querySelector('.gallery-grid');
      const prevPageBtn = document.getElementById('prev-page');
      const nextPageBtn = document.getElementById('next-page');
      const filterBtns = document.querySelectorAll('.filter-btn');
      const modal = document.getElementById('gallery-modal');
      const modalImg = document.getElementById('modal-img');
      const closeModal = document.querySelector('.close-modal');
      const prevImageBtn = document.getElementById('prev-image');
      const nextImageBtn = document.getElementById('next-image');
      
      // Create Image Observer for Lazy Loading
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target.querySelector('img');
            const dataSrc = img.getAttribute('data-src');
            if (dataSrc) {
              img.src = dataSrc;
              img.onload = () => {
                entry.target.classList.remove('loading');
              };
              img.onerror = () => {
                // Handle image loading error
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23333333"/%3E%3Ctext x="50%" y="50%" font-family="Arial" font-size="14" text-anchor="middle" fill="%23ffffff" dominant-baseline="middle"%3EImage Error%3C/text%3E%3C/svg%3E';
                entry.target.classList.remove('loading');
              };
              img.removeAttribute('data-src');
            }
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '100px' });
      
      // Load images for current page
      function loadImagesForPage(page) {
        // Clear existing gallery items
        galleryGrid.innerHTML = '';
        
        // Calculate start and end indices
        const startIndex = (page - 1) * imagesPerPage + 1; // Image numbering starts at 3.jpg
        const endIndex = Math.min(startIndex + imagesPerPage - 1, totalImages + 2);
        
        // Create gallery items
        for (let i = startIndex; i <= endIndex; i++) {
          const item = document.createElement('div');
          item.className = 'gallery-item loading';
          item.dataset.index = i;
          
          const img = document.createElement('img');
          // Use a placeholder initially
          img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23cccccc"/%3E%3C/svg%3E';
          img.setAttribute('data-src', `${i}.jpg`);
          img.alt = `Gallery Image ${i}`;
          
          item.appendChild(img);
          galleryGrid.appendChild(item);
          
          // Add click event for modal
          item.addEventListener('click', () => {
            openModal(i);
          });
          
          // Observe for lazy loading
          imageObserver.observe(item);
        }
        
        // Update pagination status
        document.querySelector('.page-status').textContent = `Page ${page} of ${totalPages}`;
        
        // Enable/disable pagination buttons
        prevPageBtn.disabled = page === 1;
        nextPageBtn.disabled = page === totalPages;
        
        // Update filter buttons active state
        filterBtns.forEach(btn => {
          btn.classList.toggle('active', parseInt(btn.dataset.page) === page);
        });
      }
      
      // Handle pagination
      prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          loadImagesForPage(currentPage);
          document.getElementById('gallery-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      
      nextPageBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          loadImagesForPage(currentPage);
          document.getElementById('gallery-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      
      // Filter buttons functionality
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const page = parseInt(btn.dataset.page);
          currentPage = page;
          loadImagesForPage(page);
          
          // Update active state
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
      
      // Modal functionality
      function openModal(imageIndex) {
        currentModalIndex = imageIndex;
        modalImg.src = `${imageIndex}.jpg`;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        
        // Update navigation buttons
        updateModalNavigation();
      }
      
      function closeModalHandler() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
      }
      
      function updateModalNavigation() {
        prevImageBtn.disabled = currentModalIndex <= 3; // First image is 3.jpg
        nextImageBtn.disabled = currentModalIndex >= totalImages + 2; // Last image
      }
      
      // Modal navigation
      prevImageBtn.addEventListener('click', () => {
        if (currentModalIndex > 3) {
          currentModalIndex--;
          modalImg.src = `${currentModalIndex}.jpg`;
          updateModalNavigation();
        }
      });
      
      nextImageBtn.addEventListener('click', () => {
        if (currentModalIndex < totalImages + 2) {
          currentModalIndex++;
          modalImg.src = `${currentModalIndex}.jpg`;
          updateModalNavigation();
        }
      });
      
      // Close modal events
      closeModal.addEventListener('click', closeModalHandler);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModalHandler();
        }
      });
      
      // Keyboard navigation for modal
      document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
          if (e.key === 'Escape') {
            closeModalHandler();
          } else if (e.key === 'ArrowLeft' && !prevImageBtn.disabled) {
            prevImageBtn.click();
          } else if (e.key === 'ArrowRight' && !nextImageBtn.disabled) {
            nextImageBtn.click();
          }
        }
      });
      
      // Initialize gallery with first page
      loadImagesForPage(currentPage);
      galleryInitialized = true;
    }
    
    // Check if we should initialize gallery on page load (if it's the active tab)
    if (document.getElementById('gallery-content').classList.contains('active')) {
      initializeGallery();
    }
    
    // Add intro animation to title
    const animatedTitle = document.getElementById('animated-title');
    if (animatedTitle) {
      animatedTitle.classList.add('title-animation');
    }
    
    // Add smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  });