// scripts/validation.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Сбрасываем предыдущие ошибки
        document.querySelectorAll('.input.is-danger, .textarea.is-danger, .select select.is-danger').forEach(el => {
            el.classList.remove('is-danger');
        });
        document.querySelectorAll('.help.is-danger').forEach(el => el.remove());

        let isValid = true;

        // 1. ПРОВЕРКА ИМЕНИ
        const name = document.getElementById('name');
        const nameValue = name.value.trim();
        if (nameValue === '') {
            showError(name, 'Введите ваше имя');
            isValid = false;
        } else if (nameValue.split(' ').filter(word => word.length > 0).length < 2) {
            showError(name, 'Введите имя и фамилию');
            isValid = false;
        }

        // 2. ПРОВЕРКА EMAIL
        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailValue.includes('@') || !emailValue.includes('.')) {
            showError(email, 'Введите корректный email (пример: name@mail.ru)');
            isValid = false;
        }

        // 3. ПРОВЕРКА ТЕМЫ
        const subject = document.getElementById('subject');
        if (!subject.value) {
            showError(subject, 'Выберите тему сообщения');
            isValid = false;
        }

        // 4. ПРОВЕРКА СООБЩЕНИЯ
        const message = document.getElementById('message');
        const messageValue = message.value.trim();
        if (messageValue === '') {
            showError(message, 'Введите сообщение');
            isValid = false;
        } else if (messageValue.length < 10) {
            showError(message, 'Сообщение должно быть не меньше 10 символов');
            isValid = false;
        }

        // 5. ПРОВЕРКА СОГЛАСИЯ
        const agreement = document.getElementById('agreement');
        if (!agreement.checked) {
            const parentDiv = agreement.closest('.field');
            const help = document.createElement('p');
            help.classList.add('help', 'is-danger');
            help.textContent = 'Необходимо дать согласие на обработку данных';
            parentDiv.appendChild(help);
            isValid = false;
        }

        // ЕСЛИ ВСЁ ХОРОШО
        if (isValid) {
            const formData = {
                name: nameValue,
                email: emailValue,
                subject: subject.value,
                message: messageValue
            };
            
            // Создаем событие для логгера
            const customEvent = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(customEvent);
            
            // Показываем сообщение
            alert('Спасибо за ваш отзыв! Мы свяжемся с вами в ближайшее время.');
            
            // Очищаем форму
            form.reset();
        }
    });

    // Функция показа ошибки
    function showError(input, message) {
        input.classList.add('is-danger');
        const help = document.createElement('p');
        help.classList.add('help', 'is-danger');
        help.textContent = message;
        
        // Для select особый случай
        if (input.tagName === 'SELECT') {
            input.parentNode.parentNode.appendChild(help);
        } else {
            input.parentNode.parentNode.appendChild(help);
        }
    }

    // Автоматическое скрытие ошибок при вводе
    document.querySelectorAll('.input, .textarea, select').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-danger');
            const parent = this.parentNode.parentNode;
            const errors = parent.querySelectorAll('.help.is-danger');
            errors.forEach(el => el.remove());
        });
        
        // Для select также на change
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', function() {
                this.classList.remove('is-danger');
                const parent = this.parentNode.parentNode;
                const errors = parent.querySelectorAll('.help.is-danger');
                errors.forEach(el => el.remove());
            });
        }
    });

    // Для checkbox
    const agreement = document.getElementById('agreement');
    if (agreement) {
        agreement.addEventListener('change', function() {
            const parentDiv = this.closest('.field');
            const errors = parentDiv.querySelectorAll('.help.is-danger');
            errors.forEach(el => el.remove());
        });
    }
});
