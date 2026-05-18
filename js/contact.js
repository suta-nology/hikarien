/* ─────────────────────────────────────────
   AZUMIEN — contact.js  (contact.html only)
───────────────────────────────────────── */

const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');

if (contactForm && submitBtn) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    // Basic validation
    let valid = true;
    contactForm.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      } else {
        field.classList.remove('error');
      }
    });

    if (!valid) return;

    submitBtn.disabled = true;
    submitBtn.textContent = (LANG[currentLang] || LANG.ja).fSending || '送信中...';

    setTimeout(() => {
      const thanks = document.getElementById('thankYou');
      if (thanks) {
        contactForm.style.display = 'none';
        thanks.style.display = 'block';
      } else {
        alert('お問い合わせありがとうございます。\n担当者よりご連絡いたします。');
        contactForm.reset();
      }
      submitBtn.disabled = false;
      submitBtn.textContent = (LANG[currentLang] || LANG.ja).fSubmit || '送信する';
    }, 1500);
  });

  // Live validation: remove error on input
  contactForm.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });
}
