// URL вашего Apps Script:
const API = "https://script.google.com/macros/s/AKfycbzL42OTEY9Wyv-Fvds-jdUrDbjGBFRcFNCCX6IZtqj3CbZTpEfjVTnmaClvSgNvaq_e/exec";

// === отправить очки =========================
function saveScore(score){
  const payload = {␊
    score,␊
    initData: window.Telegram?.WebApp?.initData || ""  // Telegram отдаёт сам
  };␊
  return fetch(API, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
}

// === получить топ-10 ========================
async function getTop(){
  const res = await fetch(API);
  return await res.json();   // [[id,name,score],…]
}

// Support CommonJS require in tests
if (typeof module !== "undefined") {
  module.exports = { saveScore, getTop };
}
