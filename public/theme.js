(function () {
  const theme = localStorage.getItem("theme") || "dark";
  document.documentElement.classList.add(theme);

  window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add(theme);

    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    toggle.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";

    toggle.addEventListener("click", () => {
      const isDark = document.documentElement.classList.contains("dark");
      const newTheme = isDark ? "light" : "dark";

      document.documentElement.classList.remove("dark", "light");
      document.body.classList.remove("dark", "light");
      document.documentElement.classList.add(newTheme);
      document.body.classList.add(newTheme);
      localStorage.setItem("theme", newTheme);
      toggle.textContent = newTheme === "dark" ? "Light Mode" : "Dark Mode";
    });
  });
})();
