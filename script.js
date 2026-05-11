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
      hour12: false,
      timeZone: "Asia/Kolkata"
    });
    const currentHour = Number(formatter.format(new Date()));
    const isOpen = currentHour >= 9 && currentHour < 21;

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
