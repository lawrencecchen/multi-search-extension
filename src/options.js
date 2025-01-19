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

// Load config on startup
document.addEventListener("DOMContentLoaded", async () => {
  // First load the default config from config.json
  const response = await fetch(chrome.runtime.getURL("config.json"));
  const defaultConfig = await response.json();

  // Then get user config
  const { searchConfig } = await chrome.storage.sync.get("searchConfig");

  // Merge with defaults, ensuring finalFocus has a value
  const cfg = Object.assign({}, defaultConfig, searchConfig || {});

  const engineListEl = document.getElementById("engineList");
  const finalFocusEl = document.getElementById("finalFocus");

  // Render each engine
  cfg.searchEngines.forEach((engine, idx) => {
    const row = document.createElement("div");
    row.innerHTML = `
      <label>${engine.name}</label>
      <input type="checkbox" data-type="enabled" data-index="${idx}" ${
      engine.enabled ? "checked" : ""
    }/> Enabled
      <input type="checkbox" data-type="prewarm" data-index="${idx}" ${
      engine.prewarm ? "checked" : ""
    }/> Prewarm
      <br/>
      <input data-type="url" data-index="${idx}" value="${
      engine.url
    }" size="60"/>
    `;
    engineListEl.appendChild(row);
  });

  // Populate finalFocus select
  cfg.searchEngines.forEach((engine) => {
    const opt = document.createElement("option");
    opt.value = engine.name;
    opt.textContent = engine.name;
    if (cfg.finalFocus === engine.name) {
      opt.selected = true;
    }
    finalFocusEl.appendChild(opt);
  });

  // Add reset button handler
  document
    .getElementById("resetFinalFocus")
    .addEventListener("click", async () => {
      finalFocusEl.value = defaultConfig.finalFocus;
      // Trigger save to persist the change
      cfg.finalFocus = defaultConfig.finalFocus;
      await chrome.storage.sync.set({ searchConfig: cfg });
      alert("Final focus reset to default!");
    });

  // Listen for save
  document.getElementById("saveBtn").addEventListener("click", async () => {
    // read each row back in
    const inputs = engineListEl.querySelectorAll("input");
    inputs.forEach((inpt) => {
      const index = parseInt(inpt.getAttribute("data-index"));
      const type = inpt.getAttribute("data-type");
      if (type === "enabled" || type === "prewarm") {
        cfg.searchEngines[index][type] = inpt.checked;
      } else if (type === "url") {
        cfg.searchEngines[index][type] = inpt.value;
      }
    });
    cfg.finalFocus = finalFocusEl.value;

    // Save updated settings
    await chrome.storage.sync.set({ searchConfig: cfg });
    alert("Configurations saved!");
  });
});
