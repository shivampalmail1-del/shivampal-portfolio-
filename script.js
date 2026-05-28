/* =========================================
   SHIVAM PAL — CREATIVE PORTFOLIO
   script.js
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------
     1. PAGE LOADER
  ----------------------------------------------- */
  const loader = document.querySelector('.loader');
  if (loader) {
    let progress = 0;
    const numEl = loader.querySelector('.loader-num');
    const interval = setInterval(() => {
      progress += Math.random() * 18;
      if (progress >= 100) { progress = 100; clearInterval(interval); }
      if (numEl) numEl.textContent = Math.floor(progress) + '%';
    }, 80);
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 1700);
    });
    setTimeout(() => loader.classList.add('hidden'), 3000); // fallback
  }

  /* -----------------------------------------------
     2. CUSTOM CURSOR
  ----------------------------------------------- */
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    }
  });

  function animFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    if (follower) {
      follower.style.left = followerX + 'px';
      follower.style.top  = followerY + 'px';
    }
    requestAnimationFrame(animFollower);
  }
  animFollower();

  /* -----------------------------------------------
     3. NAV — SCROLL & HAMBURGER
  ----------------------------------------------- */
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  window.addEventListener('scroll', () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }
  });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* Active nav link */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  /* -----------------------------------------------
     4. REVEAL ON SCROLL (IntersectionObserver)
  ----------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObs.observe(el));
  }

  /* -----------------------------------------------
     5. HERO PARTICLES
  ----------------------------------------------- */
  const particleContainer = document.querySelector('.hero-particles');
  if (particleContainer) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 3 + 1;
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        bottom: ${Math.random() * 20}%;
        width: ${size}px;
        height: ${size}px;
        animation-duration: ${Math.random() * 12 + 8}s;
        animation-delay: ${Math.random() * 8}s;
      `;
      particleContainer.appendChild(p);
    }
  }

  /* -----------------------------------------------
     6. SKILL BARS ANIMATION
  ----------------------------------------------- */
  const skillBars = document.querySelectorAll('.skill-fill');
  if (skillBars.length) {
    const skillObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          fill.style.width = fill.dataset.width;
          skillObs.unobserve(fill);
        }
      });
    }, { threshold: 0.5 });
    skillBars.forEach(bar => skillObs.observe(bar));
  }

  /* -----------------------------------------------
     7. COUNTER ANIMATION (stats)
  ----------------------------------------------- */
  const counters = document.querySelectorAll('.stat-num');
  if (counters.length) {
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const suffix = el.dataset.suffix || '';
          let count = 0;
          const step = Math.ceil(target / 60);
          const tick = setInterval(() => {
            count += step;
            if (count >= target) { count = target; clearInterval(tick); }
            el.innerHTML = count + '<span>' + suffix + '</span>';
          }, 30);
          countObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObs.observe(c));
  }

  /* -----------------------------------------------
     8. PORTFOLIO FILTER
  ----------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portCards  = document.querySelectorAll('.port-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      portCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s, transform 0.4s';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* -----------------------------------------------
     9. CONTACT FORM — handled by Formspree (@formspree/ajax)
  ----------------------------------------------- */

  /* -----------------------------------------------
     10. SMOOTH PARALLAX on hero orb
  ----------------------------------------------- */
  const orb = document.querySelector('.hero-orb');
  if (orb) {
    window.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      orb.style.transform = `translateY(calc(-50% + ${y}px)) translateX(${x}px)`;
    });
  }

  /* -----------------------------------------------
     11. HORIZONTAL SCROLL ticker duplicator
  ----------------------------------------------- */
  const tickerInner = document.querySelector('.ticker-inner');
  if (tickerInner) {
    tickerInner.innerHTML += tickerInner.innerHTML;
  }

  /* -----------------------------------------------
     12. MAGNETIC BUTTONS
  ----------------------------------------------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

});
