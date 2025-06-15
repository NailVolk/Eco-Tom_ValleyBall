console.log('[AndroidFix] Script loaded');
console.log('[AndroidFix] UserAgent:', navigator.userAgent);
console.log('[AndroidFix] Telegram WebApp detected:', !!window.Telegram?.WebApp);

// Создаем контейнер для логов
const logContainer = document.createElement('div');
logContainer.id = 'android-debug-logs';
logContainer.style.cssText = `
    position: fixed;
    bottom: 10px;
    left: 10px;
    width: 90%;
    max-height: 30%;
    overflow-y: auto;
    background: rgba(0,0,0,0.7);
    color: lime;
    padding: 8px;
    font-family: monospace;
    font-size: 12px;
    z-index: 99999;
    border-radius: 5px;
    display: none;
`;
document.body.appendChild(logContainer);

// Переопределяем console.log
const originalConsoleLog = console.log;
console.log = function(...args) {
    originalConsoleLog.apply(console, args);
    const message = args.join(' ');
    logContainer.innerHTML += `[LOG] ${message}<br>`;
    logContainer.scrollTop = logContainer.scrollHeight;
};

// Кнопка для показа/скрытия логов
const toggleBtn = document.createElement('button');
toggleBtn.textContent = 'DEBUG';
toggleBtn.style.cssText = `
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 99999;
    padding: 5px 10px;
    background: #f00;
    color: white;
    border: none;
    border-radius: 50%;
`;
toggleBtn.addEventListener('click', () => {
    logContainer.style.display = logContainer.style.display === 'none' ? 'block' : 'none';
});
document.body.appendChild(toggleBtn);

function applyAndroidFixes() {
    console.log('[AndroidFix] Applying fixes...');
    
    // 1. Фикс тач-событий
    console.log('[AndroidFix] Applying touch fixes');
    document.body.style.touchAction = 'manipulation';
    
    // 2. Фикс для Canvas
    const canvas = document.querySelector('canvas');
    if (canvas) {
        console.log('[AndroidFix] Canvas found, applying positioning');
        canvas.style.position = 'absolute';
    } else {
        console.error('[AndroidFix] Canvas NOT FOUND!');
    }

    // 3. Проверка Construct 3
    console.log('[AndroidFix] C3 detected:', window.C3_Instance ? 'Yes' : 'No');
}// Фикс для Android в Telegram WebView
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
if (window.Telegram && Telegram.WebApp) {
    console.log('[AndroidFix] Telegram platform:', Telegram.WebApp.platform);
    if (Telegram.WebApp.platform === 'android') {
        console.log('[AndroidFix] Android detected, initiating fixes');
        window.addEventListener('load', function() {
            console.log('[AndroidFix] Window fully loaded');
            applyAndroidFixes();
        });
    }
}
