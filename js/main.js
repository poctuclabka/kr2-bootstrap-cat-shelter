document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Кнопка "Наверх"
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) scrollTopBtn.classList.add('scroll-top--visible');
      else scrollTopBtn.classList.remove('scroll-top--visible');
    });
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. Калькулятор содержания
  const calcWeight = document.getElementById('calcWeight');
  const calcAge = document.getElementById('calcAge');
  const calcResult = document.getElementById('calcResult');
  if (calcWeight && calcAge && calcResult) {
    const calculateCost = () => {
      let weight = parseFloat(calcWeight.value) || 3;
      let age = calcAge.value;
      let baseCost = 1000;
      let weightCost = weight * 150; 
      let ageMultiplier = age === 'kitten' ? 1.3 : (age === 'senior' ? 1.2 : 1);
      calcResult.textContent = Math.round((baseCost + weightCost) * ageMultiplier).toLocaleString('ru-RU');
    };
    calcWeight.addEventListener('input', calculateCost);
    calcAge.addEventListener('change', calculateCost);
    calculateCost();
  }

  // 3. Валидация формы помощи
  const helpForm = document.getElementById('helpForm');
  if (helpForm) {
    helpForm.addEventListener('submit', function(event) {
      if (!helpForm.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault(); 
        document.getElementById('formSuccess').classList.remove('d-none');
        helpForm.reset();
        helpForm.classList.remove('was-validated');
        setTimeout(() => document.getElementById('formSuccess').classList.add('d-none'), 5000);
        return;
      }
      helpForm.classList.add('was-validated');
    }, false);
  }

  // 4. Система отзывов (Кураторы)
  function setupReviewForm(formId, containerId, nameId, starsId, textId) {
    const form = document.getElementById(formId);
    const container = document.getElementById(containerId);

    if (form && container) {
      form.addEventListener('submit', function(event) {
        event.preventDefault(); // Отменяем перезагрузку

        const name = document.getElementById(nameId).value;
        const stars = document.getElementById(starsId).value;
        const text = document.getElementById(textId).value;

        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
          starsHtml += i < stars ? '★' : '☆';
        }

        const today = new Date();
        const dateStr = today.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

        const newReviewHtml = `
          <div class="card bg-white border mb-3 shadow-sm">
            <div class="card-body p-3">
              <div class="d-flex justify-content-between mb-1">
                <strong class="small text-primary">${name}</strong>
                <span class="rating-stars fs-6 text-warning">${starsHtml}</span>
              </div>
              <p class="card-text text-muted mb-1" style="font-size: 0.75rem;">${dateStr}</p>
              <p class="card-text small mb-0">${text}</p>
            </div>
          </div>
        `;

        container.insertAdjacentHTML('beforeend', newReviewHtml);
        form.reset();
      });
    }
  }

  // Включаем формы для Екатерины и Алексея
  setupReviewForm('review-form-ekaterina', 'new-reviews-container-ekaterina', 'review-name-ekaterina', 'review-stars-ekaterina', 'review-text-ekaterina');
  setupReviewForm('review-form-alexey', 'new-reviews-container-alexey', 'review-name-alexey', 'review-stars-alexey', 'review-text-alexey');

});