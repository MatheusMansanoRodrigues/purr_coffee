/**
 * Modal de apoio via PIX — Buy Me a Coffee
 * Altere PIX_CONFIG com sua chave PIX real antes de publicar.
 */
const PIX_CONFIG = {
  key: "matheusmansano1@gmail.com",
  recipientName: "PURR COFFEE",
  city: "SAO PAULO",
  description: "Apoio Purr Coffee",
};

const PIX_AMOUNTS = [
  { value: 5, label: "Um café", icon: "ph-coffee" },
  { value: 10, label: "Dois cafés", icon: "ph-coffee" },
  { value: 15, label: "Café + snack", icon: "ph-cookie" },
  { value: 20, label: "Super apoio", icon: "ph-heart" },
];

let selectedAmount = 5;
let qrLibPromise = null;

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function formatPixField(id, value) {
  const len = String(value.length).padStart(2, "0");
  return id + len + value;
}

function crc16Pix(payload) {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
    }
    crc &= 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function buildPixPayload({ key, name, city, amount, txid }) {
  const merchantAccount =
    formatPixField("00", "br.gov.bcb.pix") + formatPixField("01", key);

  let payload = formatPixField("00", "01");
  payload += formatPixField("26", merchantAccount);
  payload += formatPixField("52", "0000");
  payload += formatPixField("53", "986");

  if (amount > 0) {
    payload += formatPixField("54", amount.toFixed(2));
  }

  payload += formatPixField("58", "BR");
  payload += formatPixField("59", removeAccents(name).substring(0, 25).toUpperCase());
  payload += formatPixField("60", removeAccents(city).substring(0, 15).toUpperCase());

  const txidClean =
    removeAccents(txid || "PURRCOFFEE")
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 25) || "PURRCOFFEE";

  payload += formatPixField("62", formatPixField("05", txidClean));
  payload += "6304";
  payload += crc16Pix(payload);

  return payload;
}

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function loadQRCodeLib() {
  if (window.QRCode) return Promise.resolve(window.QRCode);
  if (qrLibPromise) return qrLibPromise;

  qrLibPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
    script.onload = () => {
      if (window.QRCode) resolve(window.QRCode);
      else reject(new Error("QRCode carregou, mas window.QRCode não existe."));
    };
    script.onerror = () => reject(new Error("Falha ao carregar CDN do QRCode."));
    document.head.appendChild(script);
  });

  return qrLibPromise;
}

function createPixModal() {
  if (document.getElementById("pixOverlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "pixOverlay";
  overlay.className = "pix-overlay";
  overlay.innerHTML = `
    <div class="pix-modal" role="dialog" aria-modal="true" aria-labelledby="pixModalTitle">
      <div class="pix-modal-header">
        <div>
          <h2 class="pix-modal-title" id="pixModalTitle">Apoie o Purr'Coffee <i class="ph-bold ph-coffee"></i></h2>
          <p class="pix-modal-subtitle">Escolha um valor e pague via PIX</p>
        </div>
        <button type="button" class="pix-close-btn" id="pixCloseBtn" aria-label="Fechar">×</button>
      </div>
      <div class="pix-modal-body">
        <p class="pix-amount-label">Quanto você quer apoiar?</p>
        <div class="pix-amount-grid" id="pixAmountGrid">
          ${PIX_AMOUNTS.map(
            (a, i) => `
            <button type="button" class="pix-amount-btn${i === 0 ? " active" : ""}" data-amount="${a.value}">
              ${formatBRL(a.value)}
              <small><i class="ph-bold ${a.icon}"></i> ${a.label}</small>
            </button>
          `,
          ).join("")}
        </div>
        <div class="pix-custom-row">
          <span class="pix-custom-prefix">R$</span>
          <input
            type="number"
            class="pix-custom-input"
            id="pixCustomAmount"
            placeholder="Outro valor"
            min="1"
            step="0.01"
          />
        </div>
        <button type="button" class="pix-generate-btn" id="pixGenerateBtn">
          <i class="ph-bold ph-qr-code"></i>
          Gerar PIX
        </button>
        <p class="pix-error" id="pixError"></p>
        <div class="pix-result" id="pixResult">
          <div class="pix-value-display" id="pixValueDisplay"></div>
          <div class="pix-qr-wrap" id="pixQrWrap"></div>
          <div class="pix-copy-box">
            <textarea class="pix-copy-text" id="pixCopyText" readonly rows="3"></textarea>
          </div>
          <button type="button" class="pix-copy-btn" id="pixCopyBtn">
            <i class="ph-bold ph-copy"></i>
            Copiar código PIX
          </button>
          <p class="pix-hint">
            Abra o app do seu banco, escolha <strong>PIX → Pagar com QR Code</strong> ou
            <strong>PIX Copia e Cola</strong> e confirme o pagamento.
          </p>
          <p class="pix-key-info">Chave PIX: <strong id="pixKeyDisplay"></strong></p>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  bindPixModalEvents(overlay);
}

function bindPixModalEvents(overlay) {
  const closeBtn = overlay.querySelector("#pixCloseBtn");
  const generateBtn = overlay.querySelector("#pixGenerateBtn");
  const copyBtn = overlay.querySelector("#pixCopyBtn");
  const customInput = overlay.querySelector("#pixCustomAmount");
  const amountGrid = overlay.querySelector("#pixAmountGrid");

  closeBtn.addEventListener("click", closePixModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closePixModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) {
      closePixModal();
    }
  });

  amountGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".pix-amount-btn");
    if (!btn) return;
    amountGrid.querySelectorAll(".pix-amount-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedAmount = parseFloat(btn.dataset.amount);
    customInput.value = "";
    hidePixError();
  });

  customInput.addEventListener("input", () => {
    amountGrid.querySelectorAll(".pix-amount-btn").forEach((b) => b.classList.remove("active"));
    hidePixError();
  });

  generateBtn.addEventListener("click", generatePix);
  copyBtn.addEventListener("click", copyPixCode);
}

function getSelectedAmount() {
  const customInput = document.getElementById("pixCustomAmount");
  const custom = parseFloat(customInput.value.replace(",", "."));

  if (customInput.value.trim() !== "") {
    if (isNaN(custom) || custom < 1) {
      showPixError("Informe um valor válido (mínimo R$ 1,00).");
      return null;
    }
    return Math.round(custom * 100) / 100;
  }

  return selectedAmount;
}

function showPixError(msg) {
  const el = document.getElementById("pixError");
  el.textContent = msg;
  el.classList.add("visible");
}

function hidePixError() {
  const el = document.getElementById("pixError");
  el.textContent = "";
  el.classList.remove("visible");
}

async function generatePix() {
  hidePixError();

  const amount = getSelectedAmount();
  if (amount === null) return;

  if (!PIX_CONFIG.key || PIX_CONFIG.key.includes("exemplo")) {
    showPixError(
      "Configure sua chave PIX em js/pix-support.js (PIX_CONFIG.key) antes de usar.",
    );
    return;
  }

  const txid = "PURR" + Date.now().toString(36).toUpperCase();
  const payload = buildPixPayload({
    key: PIX_CONFIG.key,
    name: PIX_CONFIG.recipientName,
    city: PIX_CONFIG.city,
    amount,
    txid,
  });

  const resultEl = document.getElementById("pixResult");
  const valueEl = document.getElementById("pixValueDisplay");
  const copyText = document.getElementById("pixCopyText");
  const qrWrap = document.getElementById("pixQrWrap");
  const keyDisplay = document.getElementById("pixKeyDisplay");

  valueEl.textContent = formatBRL(amount);
  copyText.value = payload;
  keyDisplay.textContent = PIX_CONFIG.key;
  qrWrap.innerHTML = "";

  try {
    const QRCode = await loadQRCodeLib();
    new QRCode(qrWrap, {
      text: payload,
      width: 220,
      height: 220,
      colorDark: "#5c2e0e",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M,
    });
    resultEl.classList.add("visible");
  } catch {
    showPixError("Erro ao gerar QR Code. Verifique sua conexão e tente novamente.");
  }
}

async function copyPixCode() {
  const copyText = document.getElementById("pixCopyText");
  const copyBtn = document.getElementById("pixCopyBtn");

  try {
    await navigator.clipboard.writeText(copyText.value);
  } catch {
    copyText.select();
    document.execCommand("copy");
  }

  copyBtn.classList.add("copied");
  copyBtn.innerHTML = '<i class="ph-bold ph-check"></i> Código copiado!';
  setTimeout(() => {
    copyBtn.classList.remove("copied");
    copyBtn.innerHTML = '<i class="ph-bold ph-copy"></i> Copiar código PIX';
  }, 2500);
}

function openPixModal() {
  createPixModal();
  const overlay = document.getElementById("pixOverlay");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";

  selectedAmount = PIX_AMOUNTS[0].value;
  document.getElementById("pixCustomAmount").value = "";
  document.getElementById("pixResult").classList.remove("visible");
  hidePixError();

  document.querySelectorAll(".pix-amount-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === 0);
  });
}

function closePixModal() {
  const overlay = document.getElementById("pixOverlay");
  if (!overlay) return;
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

function initPixDonateButtons() {
  document.querySelectorAll(".pix-donate-btn").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openPixModal();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  createPixModal();
  initPixDonateButtons();
});
