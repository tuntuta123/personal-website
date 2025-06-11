(function () {
  const theme = localStorage.getItem("theme") || "dark";
  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add(theme);
    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
      toggle.addEventListener("click", () => {
        const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
        document.body.classList.remove("dark", "light");
        document.body.classList.add(newTheme);
        localStorage.setItem("theme", newTheme);
        toggle.textContent = newTheme === "dark" ? "Light Mode" : "Dark Mode";
      });
    }
  });
})();
