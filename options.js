// Get the toggle element
const autoCloseToggle = document.getElementById("autoCloseTabsToggle");

// Load saved settings
chrome.storage.sync.get(["autoCloseTabs"], (result) => {
  // Default to true if not set
  autoCloseToggle.checked = result.autoCloseTabs !== false;
});

// Save settings when changed
autoCloseToggle.addEventListener("change", (e) => {
  chrome.storage.sync.set({
    autoCloseTabs: e.target.checked,
  });
});
