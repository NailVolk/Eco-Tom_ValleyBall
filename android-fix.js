console.log('[Android] Starting minimal fix');

// Только критически важные правки
document.body.style.touchAction = 'manipulation';
document.querySelector('canvas')?.style.setProperty('position', 'fixed', 'important');

console.log('[Android] Minimal fixes applied');
