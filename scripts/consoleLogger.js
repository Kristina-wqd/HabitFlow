// consoleLogger.js
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('formValid', function(event) {
        const formData = event.detail;
        
        console.clear();
        console.log('%c=== НОВЫЙ ОТЗЫВ ===', 
                    'color: #00d1b2; font-weight: bold; font-size: 16px');
        console.log('%cОтправитель:', 'font-weight: bold', formData.name);
        console.log('%cEmail:', 'font-weight: bold', formData.email);
        console.log('%cТема:', 'font-weight: bold', formData.subject);
        console.log('%cСообщение:', 'font-weight: bold', formData.message);
        
        const timestamp = new Date().toLocaleString('ru-RU');
        console.log('%cВремя:', 'font-weight: bold', timestamp);
        console.log('%c=============================', 
                    'color: #00d1b2; font-weight: bold');
    });
});
