(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile menu
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // close on click
    navMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Prefill from service links
  document.querySelectorAll("[data-prefill]").forEach((el) => {
    el.addEventListener("click", () => {
      const val = el.getAttribute("data-prefill");
      const leadSelect = document.querySelector("#leadForm select[name='type']");
      const quickSelect = document.querySelector("#quickForm select[name='type']");
      if (leadSelect) leadSelect.value = val;
      if (quickSelect) quickSelect.value = val;
    });
  });

  // WhatsApp phone (CHANGE THIS)
  // IMPORTANT: set your real WhatsApp number in international format without +, spaces.
  const WHATSAPP_NUMBER = "79991501954"; // <-- заменить на реальный номер

  const waLink = document.getElementById("waLink");
  if (waLink) waLink.href = `https://wa.me/${WHATSAPP_NUMBER}`;

  function sanitize(s) {
    return String(s || "").replace(/\s+/g, " ").trim();
  }

  function buildMessage(data) {
    const lines = [];
    lines.push("Здравствуйте! Хочу рассчитать стоимость.");
    if (data.type) lines.push(`Тип: ${data.type}`);
    if (data.name) lines.push(`Имя: ${data.name}`);
    if (data.phone) lines.push(`Телефон: ${data.phone}`);
    if (data.address) lines.push(`Адрес/район: ${data.address}`);
    if (data.comment) lines.push(`Комментарий: ${data.comment}`);
    lines.push("Спасибо!");
    return lines.join("\n");
  }

  function submitToWhatsApp(form) {
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    const msg = buildMessage({
      type: sanitize(data.type),
      name: sanitize(data.name),
      phone: sanitize(data.phone),
      address: sanitize(data.address),
      comment: sanitize(data.comment)
    });

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const quickForm = document.getElementById("quickForm");
  if (quickForm) {
    quickForm.addEventListener("submit", (e) => {
      e.preventDefault();
      submitToWhatsApp(quickForm);
    });
  }

  const leadForm = document.getElementById("leadForm");
  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      submitToWhatsApp(leadForm);
    });
  }
})();