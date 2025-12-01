/**
 * Zenexa Infotech - Enhanced Features
 * World-class interactive components and animations
 */

// ============================================
// 1. SMOOTH SCROLL WITH PROGRESS INDICATOR
// ============================================
class ScrollProgress {
  constructor() {
    this.init();
  }

  init() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #0f766e, #06b6d4);
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    // Update on scroll
    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }
}

// ============================================
// 2. ANIMATED STATISTICS COUNTER
// ============================================
class AnimatedCounter {
  constructor(element, target, duration = 2000) {
    this.element = element;
    this.target = target;
    this.duration = duration;
    this.hasAnimated = false;
  }

  animate() {
    if (this.hasAnimated) return;
    
    const start = 0;
    const increment = this.target / (this.duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= this.target) {
        current = this.target;
        clearInterval(timer);
        this.hasAnimated = true;
      }
      this.element.textContent = Math.floor(current).toLocaleString();
    }, 16);
  }

  static observeCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.counter);
          const counter = new AnimatedCounter(entry.target, target);
          counter.animate();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }
}

// ============================================
// 3. PARALLAX EFFECT
// ============================================
class ParallaxEffect {
  constructor() {
    this.elements = document.querySelectorAll('[data-parallax]');
    this.init();
  }

  init() {
    if (this.elements.length === 0) return;

    window.addEventListener('scroll', () => {
      this.elements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = -(window.scrollY * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }
}

// ============================================
// 4. TOAST NOTIFICATIONS
// ============================================
class ToastNotification {
  static show(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
      success: '✓',
      error: '✕',
      info: 'ℹ',
      warning: '⚠'
    };

    toast.innerHTML = `
      <div class="toast-icon">${icons[type]}</div>
      <div class="toast-message">${message}</div>
    `;

    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#0f766e' : type === 'error' ? '#dc2626' : '#06b6d4'};
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 10000;
      animation: slideInRight 0.3s ease;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 600;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
}

// ============================================
// 5. LAZY LOADING IMAGES
// ============================================
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });

      this.images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      this.images.forEach(img => {
        img.src = img.dataset.src;
      });
    }
  }
}

// ============================================
// 6. SMOOTH PAGE TRANSITIONS
// ============================================
class PageTransition {
  constructor() {
    this.init();
  }

  init() {
    // Add transition overlay
    const overlay = document.createElement('div');
    overlay.id = 'page-transition';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #0f766e, #06b6d4);
      z-index: 99999;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s ease;
    `;
    document.body.appendChild(overlay);

    // Intercept link clicks
    document.querySelectorAll('a:not([target="_blank"])').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('/') || href.startsWith('./')) {
          e.preventDefault();
          overlay.style.opacity = '1';
          overlay.style.pointerEvents = 'all';
          
          setTimeout(() => {
            window.location.href = href;
          }, 400);
        }
      });
    });

    // Fade out on load
    window.addEventListener('load', () => {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.pointerEvents = 'none';
      }, 400);
    });
  }
}

// ============================================
// 7. INTERACTIVE 3D CARD TILT
// ============================================
class CardTilt {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.element.addEventListener('mousemove', (e) => {
      const rect = this.element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      this.element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    this.element.addEventListener('mouseleave', () => {
      this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  }

  static initAll() {
    document.querySelectorAll('[data-tilt]').forEach(el => {
      new CardTilt(el);
    });
  }
}

// ============================================
// 8. CURSOR FOLLOWER (Desktop only)
// ============================================
class CursorFollower {
  constructor() {
    if (window.innerWidth < 1024) return; // Only on desktop
    this.init();
  }

  init() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border: 2px solid #0f766e;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transition: transform 0.2s ease, opacity 0.2s ease;
      opacity: 0;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });

    // Smooth follow
    function animate() {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animate);
    }
    animate();

    // Scale on hover
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = '#06b6d4';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#0f766e';
      });
    });
  }
}

// ============================================
// 9. FORM VALIDATION ENHANCEMENT
// ============================================
class FormValidator {
  static validate(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('error');
        input.addEventListener('input', () => input.classList.remove('error'), { once: true });
      }
    });

    return isValid;
  }

  static showSuccess(form) {
    ToastNotification.show('Form submitted successfully!', 'success');
    form.reset();
  }

  static showError(message) {
    ToastNotification.show(message || 'Please fill all required fields', 'error');
  }
}

// Cookie consent removed as per user request

// ============================================
// ANIMATIONS CSS (Add to head)
// ============================================
const animationStyles = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  @keyframes slideInUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  @keyframes slideOutDown {
    from { transform: translateY(0); }
    to { transform: translateY(100%); }
  }
  .loaded {
    animation: fadeIn 0.5s ease;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

// ============================================
// INITIALIZE ALL FEATURES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Add animation styles
  const style = document.createElement('style');
  style.textContent = animationStyles;
  document.head.appendChild(style);

  // Initialize features
  new ScrollProgress();
  new ParallaxEffect();
  new LazyLoader();
  new PageTransition();
  new CursorFollower();
  
  AnimatedCounter.observeCounters();
  CardTilt.initAll();

  console.log('🚀 Zenexa Enhanced Features Loaded');
});

// Export for use in other scripts
window.ZenexaFeatures = {
  ToastNotification,
  FormValidator,
  AnimatedCounter,
  CardTilt
};
