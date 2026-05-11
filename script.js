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

  const dateInput = document.querySelector('input[type="date"]');

  if (dateInput) {
    const today = new Date();
    const timezoneOffset = today.getTimezoneOffset() * 60000;
    dateInput.min = new Date(today.getTime() - timezoneOffset).toISOString().slice(0, 10);
  }
})();
