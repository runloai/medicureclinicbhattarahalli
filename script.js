(function () {
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector("#site-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    });

    nav.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        menuButton.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });
  }

  const statusText = document.querySelector("[data-status-text]");
  const statusIcon = document.querySelector(".quick-icon.status");

  if (statusText && statusIcon) {
    const formatter = new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
      timeZone: "Asia/Kolkata"
    });
    const now = new Date();
    const parts = formatter.formatToParts(now);
    const hour = Number(parts.find(p => p.type === 'hour').value);
    const minute = Number(parts.find(p => p.type === 'minute').value);
    const currentTime = hour * 60 + minute;
    const openTime = 8 * 60 + 30;
    const closeTime = 23 * 60 + 30;
    const isOpen = currentTime >= openTime && currentTime < closeTime;

    statusText.textContent = isOpen ? "Open now" : "Closed now";
    statusIcon.classList.toggle("is-open", isOpen);
  }

  const appointmentForm = document.querySelector("[data-whatsapp-form]");

  if (appointmentForm) {
    appointmentForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(appointmentForm);
      const name = String(formData.get("name") || "").trim();
      const phone = String(formData.get("phone") || "").trim();
      const problem = String(formData.get("problem") || "").trim();

      if (!name || !phone || !problem) {
        appointmentForm.reportValidity();
        return;
      }

      const message = [
        "Hello Medicure Clinic & Medical,",
        "I would like to book an appointment.",
        "",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Problem: ${problem}`
      ].join("\n");

      window.location.href = `https://wa.me/917977277478?text=${encodeURIComponent(message)}`;
    });
  }
})();
