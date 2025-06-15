// Фикс для Android в Telegram WebView
function applyAndroidFixes() {
    // 1. Фикс тач-событий
    document.body.style.touchAction = 'manipulation';
    document.body.style.webkitTapHighlightColor = 'transparent';
    
    // 2. Фикс для Canvas (WebGL)
    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
    }
    
    // 3. Фикс масштабирования
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(meta);
    
    console.log('Android fixes applied');
}

// Проверяем платформу
if (window.Telegram && Telegram.WebApp) {
    if (Telegram.WebApp.platform === 'android') {
        // Применяем фиксы после полной загрузки
        window.addEventListener('load', applyAndroidFixes);
    }
} else if (/Android/.test(navigator.userAgent)) {
    // Фолбек для обычного Android-браузера
    window.addEventListener('load', applyAndroidFixes);
}