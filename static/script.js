document.addEventListener("DOMContentLoaded", () => {
  const html = document.querySelector("html");
  const body = document.querySelector("body");
  const themeButtons = document.querySelectorAll(".toggle-theme-button");
  const sidebarButton = document.querySelector("#sidebar-button");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const sidebarLinks = sidebarOverlay.querySelectorAll("a");

  function toggleTheme() {
    html.classList.toggle("dark");

    const isDark = html.classList.contains("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  if (themeButtons) {
    themeButtons.forEach((themeButton) => {
      themeButton.addEventListener("click", toggleTheme);
    });
  }

  function openSidebar() {
    sidebarOverlay.classList.remove("-translate-x-full");
    sidebarOverlay.classList.add("translate-x-0");
    body.classList.add("overflow-hidden");
  }

  function closeSidebar() {
    sidebarOverlay.classList.remove("translate-x-0");
    sidebarOverlay.classList.add("-translate-x-full");
    body.classList.remove("overflow-hidden");
  }

  sidebarButton.addEventListener("click", () => {
    if (sidebarOverlay.classList.contains("translate-x-0")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  sidebarLinks.forEach((sidebarLink) => {
    sidebarLink.addEventListener("click", () => {
      closeSidebar();
    });
  });
});
