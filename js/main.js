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
    // Включаем формы для Марины и Игоря
  setupReviewForm('review-form-marina', 'new-reviews-container-marina', 'review-name-marina', 'review-stars-marina', 'review-text-marina');
  setupReviewForm('review-form-igor', 'new-reviews-container-igor', 'review-name-igor', 'review-stars-igor', 'review-text-igor');
    // ==========================================
  // 5. Фильтрация в каталоге (catalog.html)
  // ==========================================
  const filterForm = document.getElementById('filter-form');
  const catalogGrid = document.getElementById('catalog-grid');
  
  if (filterForm && catalogGrid) {
    const catItems = document.querySelectorAll('.cat-item');
    const noResultsMsg = document.getElementById('no-results');
    const resetBtn = document.getElementById('reset-filters');

    function filterCats() {
      // Получаем выбранные значения
      const selectedGender = document.querySelector('input[name="gender"]:checked').value;
      const selectedAge = document.getElementById('ageSelect').value;
      
      let visibleCount = 0;

      // Перебираем все карточки
      catItems.forEach(item => {
        const itemGender = item.getAttribute('data-gender');
        const itemAge = item.getAttribute('data-age');

        // Проверяем совпадения
        const genderMatch = (selectedGender === 'all' || itemGender === selectedGender);
        const ageMatch = (selectedAge === 'all' || itemAge === selectedAge);

        if (genderMatch && ageMatch) {
          item.classList.remove('d-none'); // Показываем
          visibleCount++;
        } else {
          item.classList.add('d-none'); // Скрываем
        }
      });

      // Показываем сообщение, если ничего не найдено
      if (visibleCount === 0) {
        noResultsMsg.classList.remove('d-none');
      } else {
        noResultsMsg.classList.add('d-none');
      }
    }

    // Слушаем изменения в фильтрах (радиокнопки и селект)
    filterForm.addEventListener('change', filterCats);

    // Кнопка сброса
    resetBtn.addEventListener('click', () => {
      filterForm.reset(); // Сбрасываем форму
      document.getElementById('genderAll').checked = true; // Ставим радио "Не важно"
      filterCats(); // Применяем фильтр
    });
  }
});