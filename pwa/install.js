(() => {
  'use strict';
  const panel = document.createElement('div');
  panel.className = 'panel install-panel';
  panel.innerHTML = '<div class="row"><div><h2>Ứng dụng ENVI</h2><p id="installState" class="muted" role="status"></p></div><button id="installApp" type="button" hidden>Cài ứng dụng</button></div><details id="installHelp"><summary>Đưa ENVI ra màn hình chính</summary><p id="installSteps"></p><p class="muted">Cài lần đầu cần Internet. Khi sử dụng, kết nối cùng Wi-Fi với máy chính và cho phép truy cập mạng nội bộ khi được hỏi.</p><p class="muted">Nếu đã cài nhưng không kết nối được, kiểm tra địa chỉ máy, quyền mạng nội bộ và phiên bản trình duyệt. Một số phiên bản iPhone có thể chặn kết nối này.</p></details><p id="offlineReady" class="muted" role="status">Đang chuẩn bị lưu giao diện…</p><button id="updateApp" type="button" class="secondary" hidden>Cập nhật ứng dụng</button>';
  document.getElementById('connect').prepend(panel);
  const byId = id => document.getElementById(id);
  const button = byId('installApp'), state = byId('installState');
  const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const standalone = matchMedia('(display-mode: standalone)');
  let promptEvent, registration;
  function render() {
    const installed = standalone.matches || navigator.standalone === true;
    state.textContent = installed ? 'Đang mở như ứng dụng.' : 'Mở ENVI bằng biểu tượng riêng trên điện thoại hoặc máy tính.';
    button.hidden = installed || !promptEvent;
    byId('installHelp').hidden = installed;
    byId('installSteps').textContent = ios ? 'Mở link này bằng Safari → Chia sẻ → Thêm vào Màn hình chính → Thêm. Bật “Mở dưới dạng ứng dụng” nếu có.' : 'Nhấn “Cài ứng dụng” khi nút xuất hiện. Bạn cũng có thể mở menu trình duyệt và chọn “Cài đặt ứng dụng” hoặc “Thêm vào màn hình chính”. Nếu không thấy, hãy mở link bằng Chrome hoặc Edge đã cập nhật.';
  }
  window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); promptEvent = event; render(); });
  window.addEventListener('appinstalled', () => { promptEvent = null; render(); state.textContent = 'Đã cài ENVI. Mở bằng biểu tượng trên màn hình chính.'; });
  standalone.addEventListener('change', render);
  button.onclick = async () => {
    if (!promptEvent) return;
    button.disabled = true;
    try { await promptEvent.prompt(); const choice = await promptEvent.userChoice; state.textContent = choice.outcome === 'accepted' ? 'Đã chấp nhận cài ENVI.' : 'Bạn có thể cài sau bằng menu trình duyệt.'; }
    catch { state.textContent = 'Mở menu trình duyệt để cài ENVI.'; }
    finally { promptEvent = null; button.hidden = true; button.disabled = false; }
  };
  render();
  const ready = byId('offlineReady');
  if (!window.isSecureContext || !('serviceWorker' in navigator)) {
    ready.textContent = 'Địa chỉ này chưa hỗ trợ lưu ứng dụng ngoại tuyến. Hãy mở link cài ENVI bằng HTTPS.';
    return;
  }
  function watchUpdate() {
    byId('updateApp').hidden = !registration.waiting;
  }
  let updating = false;
  byId('updateApp').onclick = () => {
    if (!registration?.waiting) return;
    if (!window.confirm('Cập nhật sẽ tải lại ứng dụng và kết thúc phiên đăng nhập hiện tại. Tiếp tục?')) return;
    updating = true;
    registration.waiting.postMessage({ type: 'ACTIVATE_UPDATE' });
  };
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (updating) location.reload(); else if (registration) watchUpdate(); });
  navigator.serviceWorker.register('./sw.js').then(reg => {
    registration = reg;
    watchUpdate();
    reg.addEventListener('updatefound', () => {
      const worker = reg.installing;
      worker?.addEventListener('statechange', () => {
        if (worker.state === 'installed') watchUpdate();
        if (worker.state === 'redundant') ready.textContent = 'Chưa lưu được bản mới. Kết nối Internet rồi mở lại ứng dụng.';
      });
    });
    return navigator.serviceWorker.ready;
  }).then(() => { watchUpdate(); ready.textContent = 'Đã lưu giao diện để mở ngoại tuyến. Số đo cần kết nối với máy chính.'; })
    .catch(() => { ready.textContent = 'Chưa lưu được giao diện ngoại tuyến. Kiểm tra Internet và tải lại trang.'; });
})();

