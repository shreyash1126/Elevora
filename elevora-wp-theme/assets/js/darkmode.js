// Elevora - Theme Toggle Controller (Dark/Light mode)

document.addEventListener("DOMContentLoaded", () => {
  const themeToggleButtons = document.querySelectorAll(".theme-toggle-btn");
  const storedTheme = localStorage.getItem("elevora_theme") || "light";

  // Set initial theme
  document.documentElement.setAttribute("data-theme", storedTheme);

  // Sync toggles visually
  updateToggleIcons(storedTheme);

  // Click listeners for all theme switches (handles buttons in both main header and sidebar menus)
  themeToggleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const targetTheme = currentTheme === "dark" ? "light" : "dark";

      // Apply attribute
      document.documentElement.setAttribute("data-theme", targetTheme);
      // Persist choice
      localStorage.setItem("elevora_theme", targetTheme);

      // Flash active class for CSS click animation
      btn.classList.add("theme-switching");
      setTimeout(() => btn.classList.remove("theme-switching"), 300);

      // Sync icons
      updateToggleIcons(targetTheme);

      // Emit custom event so page components can react dynamically
      const themeEvent = new CustomEvent("themeChanged", { detail: { theme: targetTheme } });
      window.dispatchEvent(themeEvent);

      // Push subtle toast notification
      if (typeof showToast === "function") {
        showToast(`Switched to ${targetTheme} mode`, "success");
      }
    });
  });

  function updateToggleIcons(theme) {
    themeToggleButtons.forEach(btn => {
      const moonIcon = btn.querySelector(".fa-moon");
      const sunIcon = btn.querySelector(".fa-sun");
      
      if (theme === "dark") {
        if (moonIcon) moonIcon.style.display = "none";
        if (sunIcon) sunIcon.style.display = "block";
      } else {
        if (moonIcon) moonIcon.style.display = "block";
        if (sunIcon) sunIcon.style.display = "none";
      }
    });
  }
});
