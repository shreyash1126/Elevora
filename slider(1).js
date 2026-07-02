// Elevora - Homepage Hero Banner Slider Controller

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".slider-dot");
  const prevBtn = document.querySelector(".slider-arrow.prev");
  const nextBtn = document.querySelector(".slider-arrow.next");
  
  if (slides.length === 0) return; // Exit if not homepage

  let currentSlide = 0;
  let slideInterval;
  const intervalTime = 4000; // 4 seconds auto slide

  // Go to specific slide
  function showSlide(index) {
    // Reset classes
    slides.forEach(slide => {
      slide.classList.remove("active");
    });
    dots.forEach(dot => {
      dot.classList.remove("active");
    });

    // Handle loop boundaries
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    // Activate current
    slides[currentSlide].classList.add("active");
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add("active");
    }
  }

  // Next/Prev functions
  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Setup auto-play interval
  function startAutoPlay() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  // Event Listeners for controls
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      startAutoPlay(); // Reset timer on click
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      startAutoPlay(); // Reset timer on click
    });
  }

  // Dots click events
  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      showSlide(idx);
      startAutoPlay(); // Reset timer on click
    });
  });

  // Touch swipe support for mobile
  let startX = 0;
  const sliderContainer = document.querySelector(".hero-slider-container");
  if (sliderContainer) {
    sliderContainer.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    sliderContainer.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const difference = startX - endX;

      if (Math.abs(difference) > 50) { // Threshold
        if (difference > 0) {
          nextSlide(); // Swipe left -> next
        } else {
          prevSlide(); // Swipe right -> prev
        }
        startAutoPlay();
      }
    }, { passive: true });
  }

  // Initialize
  showSlide(0);
  startAutoPlay();
});
