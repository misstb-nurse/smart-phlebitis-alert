// ==== ตั้งค่าตรงนี้หลัง Deploy Apps Script เสร็จ ====
// นำ URL แบบ .../exec ที่ได้จากการ Deploy Apps Script (Web App) มาวางแทนตรงนี้
const API_BASE_URL = 'PASTE_YOUR_APPS_SCRIPT_EXEC_URL_HERE';

/** เรียก API แบบอ่านข้อมูล (GET) */
function apiGet(action, params) {
  params = params || {};
  const qs = Object.keys(params)
    .map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]); })
    .join('&');
  const url = API_BASE_URL + '?action=' + encodeURIComponent(action) + (qs ? '&' + qs : '');
  return fetch(url).then(function (r) { return r.json(); });
}

/**
 * เรียก API แบบบันทึกข้อมูล (POST)
 * ใช้ Content-Type: text/plain เพื่อเลี่ยง CORS preflight ที่ Apps Script ไม่รองรับ
 */
function apiPost(action, data) {
  return fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action: action, data: data })
  }).then(function (r) { return r.json(); });
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function () { t.classList.remove('show'); }, 2200);
}
