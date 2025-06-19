// URL вашего Apps Script:
const API = "https://script.google.com/macros/s/AKfycbzL42OTEY9Wyv-Fvds-jdUrDbjGBFRcFNCCX6IZtqj3CbZTpEfjVTnmaClvSgNvaq_e/exec";

globalThis.saveScore = function (score) {
    const payload = {
        score,
        initData: (window.Telegram && Telegram.WebApp)
                    ? Telegram.WebApp.initData
                    : ""
    };

    return fetch(API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });
  // Если игра запущена как Telegram Web App — берём подпись
  const initData = window.Telegram && Telegram.WebApp
        ? Telegram.WebApp.initData
        : "";

  const payload = { score, initData };

  // Отправляем на скрипт
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).catch(err => console.error(err));
};