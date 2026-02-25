/* ================================================================
   ARES FC — script.js  (tab-page router)
================================================================ */

/* ──────────── 페이지 전환 ──────────── */
const pages   = document.querySelectorAll('.page');
const navBtns = document.querySelectorAll('[data-page]');

function showPage(id) {
  // 모든 페이지 숨김
  pages.forEach(p => p.classList.remove('page--active'));

  // 대상 페이지 표시
  const target = document.getElementById('page-' + id);
  if (target) {
    target.classList.add('page--active');
    // 페이지 상단으로 이동
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 네비 버튼 active 갱신
  navBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === id);
  });

  // 모바일 메뉴 닫기
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
}

// 모든 [data-page] 요소에 클릭 이벤트
navBtns.forEach(btn => {
  btn.addEventListener('click', () => showPage(btn.dataset.page));
});

// 초기 진입: home 표시
showPage('home');

/* ──────────── 햄버거 메뉴 ──────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

/* ──────────── 문의 폼 처리 ──────────── */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const required = contactForm.querySelectorAll('[required]');
    let valid = true;
    required.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = '#EF4444';
        input.addEventListener('input', () => { input.style.borderColor = ''; }, { once: true });
        valid = false;
      }
    });
    if (!valid) return;

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = '전송 중...';
    submitBtn.disabled = true;

    setTimeout(() => {
      formSuccess.classList.add('show');
      contactForm.reset();
      submitBtn.textContent = '문의 보내기';
      submitBtn.disabled = false;
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 700);
  });
}
