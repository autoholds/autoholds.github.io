const originalTitle = 'Reaper.';
const leavingTitle = 'Come back Bitch.';
const returningTitle = 'Welcome back.';

document.title = originalTitle;

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.title = leavingTitle;
  } else {
    document.title = returningTitle;
    setTimeout(() => {
      document.title = originalTitle;
    }, 3000);
  }
});

window.addEventListener('focus', () => {
  document.title = returningTitle;
  setTimeout(() => {
    document.title = originalTitle;
  }, 3000);
});

window.addEventListener('blur', () => {
  document.title = leavingTitle;
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.section-content, .proof-images').forEach(el => {
    observer.observe(el);
  });
});

const audio = new Audio();
let isPlaying = false;

audio.src = 'midia/Perfection.mp3';
audio.volume = 0.5;
audio.loop = true;

const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const volumeSlider = document.getElementById('volumeSlider');
const musicInfo = document.getElementById('musicInfo');

const playAudio = () => {
  audio.play();
  isPlaying = true;
  musicInfo.textContent = 'Music: Perfection | Status: Playing';
  updateMusicButtons();
};

const pauseAudio = () => {
  audio.pause();
  isPlaying = false;
  musicInfo.textContent = 'Music: Perfection | Status: Paused';
  updateMusicButtons();
};

const stopAudio = () => {
  audio.pause();
  audio.currentTime = 0;
  isPlaying = false;
  musicInfo.textContent = 'Music: Perfection | Status: Stopped';
  updateMusicButtons();
};

playBtn.addEventListener('click', playAudio);
pauseBtn.addEventListener('click', pauseAudio);
stopBtn.addEventListener('click', stopAudio);

volumeSlider.addEventListener('input', (e) => {
  audio.volume = e.target.value;
  const volumePercent = Math.round(e.target.value * 100);
  musicInfo.textContent = `Music: Perfection | Volume: ${volumePercent}%`;
});

function updateMusicButtons() {
  if (isPlaying) {
    playBtn.style.opacity = '0.5';
    pauseBtn.style.opacity = '1';
    stopBtn.style.opacity = '1';
  } else {
    playBtn.style.opacity = '1';
    pauseBtn.style.opacity = '0.5';
    stopBtn.style.opacity = '0.5';
  }
}

updateMusicButtons();

const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.proof-image').forEach(image => {
  image.addEventListener('click', (e) => {
    const img = image.querySelector('img');
    const caption = image.querySelector('.image-caption').textContent;

    modalImage.src = img.src;
    modalCaption.textContent = caption;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

const closeImageModal = () => {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
};

closeModal.addEventListener('click', closeImageModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeImageModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeImageModal();
  }
});

const staticDenseBg = document.getElementById('staticDenseBg');
const chars = '0123456789!@#$%^&*';
let charElements = [];

function createStaticBackground() {
  staticDenseBg.innerHTML = '';
  charElements = [];

  const cellSize = 20;
  const cols = Math.ceil(window.innerWidth / cellSize);
  const rows = Math.ceil(window.innerHeight / cellSize);
  const totalCells = cols * rows;

  for (let i = 0; i < totalCells; i++) {
    const charElement = document.createElement('div');
    charElement.className = 'static-char';
    charElement.textContent = chars[Math.floor(Math.random() * chars.length)];

    const colorType = Math.random();
    if (colorType < 0.7) {
      const brightness = 180 + Math.random() * 75;
      charElement.style.color = `rgb(${brightness}, ${brightness}, ${brightness})`;
    } else {
      charElement.style.color = `rgb(${200 + Math.random() * 55}, 50, 50)`;
    }

    staticDenseBg.appendChild(charElement);
    charElements.push(charElement);
  }
}

let updateCounter = 0;
function updateRandomChars() {
  updateCounter++;
  if (updateCounter < 3) return;
  updateCounter = 0;

  const updateCount = Math.max(1, Math.floor(charElements.length * 0.005));

  for (let i = 0; i < updateCount; i++) {
    const randomIndex = Math.floor(Math.random() * charElements.length);
    const charElement = charElements[randomIndex];
    charElement.textContent = chars[Math.floor(Math.random() * chars.length)];
  }
}

createStaticBackground();
window.addEventListener('scroll', updateRandomChars, { passive: true });

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(createStaticBackground, 500);
}, { passive: true });

document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const staticBg = document.getElementById('staticDenseBg');
  staticBg.style.transform = `translateY(${scrollTop * 0.3}px)`;
}, { passive: true });

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  
  document.querySelectorAll('.proof-image, .section-content, .hero-content').forEach(el => {
    const rect = el.getBoundingClientRect();
    const distance = Math.sqrt(
      Math.pow(mouseX - (rect.left + rect.width / 2), 2) +
      Math.pow(mouseY - (rect.top + rect.height / 2), 2)
    );
    
    if (distance < 300) {
      const opacity = Math.max(0, (300 - distance) / 300 * 0.15);
      el.style.boxShadow = `0 0 30px rgba(239, 68, 68, ${opacity})`;
    } else {
      el.style.boxShadow = '';
    }
  });
});

window.addEventListener('beforeunload', () => {
  audio.pause();
});
