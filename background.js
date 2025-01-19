/*
  background.js (service worker in MV3)
  
  This handles omnibox searches and opens
  ChatGPT, Google, and Perplexity in new tabs.
*/

// Store tab IDs for each search group
let searchGroups = new Map();

// Retrieve config from storage or use defaults
async function getUserSearchConfig(encodedQuery) {
  const response = await fetch(chrome.runtime.getURL("config.json"));
  const defaults = await response.json(); // read default config from file

  // Try loading user config from storage
  const stored = await chrome.storage.sync.get(["searchConfig"]);
  const merged = Object.assign({}, defaults, stored.searchConfig || {});
  // For each engine, substitute the encoded query into its URL
  merged.searchEngines = merged.searchEngines.map((engine) => {
    return {
      ...engine,
      url: engine.url.replace(/\${encodedQuery}/g, encodedQuery),
    };
  });
  return merged;
}

// Handle omnibox input
chrome.omnibox.onInputEntered.addListener(async (text, disposition) => {
  const encodedQuery = encodeURIComponent(text);

  const config = await getUserSearchConfig(encodedQuery);
  let tabIds = [];
  let groupId = Date.now().toString();

  // Create all tabs immediately in parallel
  const tabPromises = config.searchEngines
    .filter((engine) => engine.enabled)
    .map((engine) =>
      chrome.tabs.create({
        url: engine.url,
        active: false,
      })
    );

  // Wait for all tabs to be created
  const tabs = await Promise.all(tabPromises);
  tabIds = tabs.map((tab) => tab.id);

  // Handle prewarming in sequence for tabs that need it
  for (let i = 0; i < config.searchEngines.length; i++) {
    const engine = config.searchEngines[i];
    if (!engine.enabled) continue;

    if (engine.prewarm) {
      await chrome.tabs.update(tabIds[i], { active: true });
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }

  // Focus the engine indicated as finalFocus
  const finalEngine = config.searchEngines.find(
    (e) => e.name === config.finalFocus
  );
  if (finalEngine) {
    const finalIndex = config.searchEngines.indexOf(finalEngine);
    if (finalIndex !== -1 && tabIds[finalIndex]) {
      await chrome.tabs.update(tabIds[finalIndex], { active: true });
    }
  }

  // Keep track of the search group
  searchGroups.set(groupId, new Set(tabIds));
  // Store the group ID in each tab's data
  tabIds.forEach((tabId) => {
    chrome.storage.session.set({ [tabId.toString()]: groupId });
  });
});

// Listen for tab removals
chrome.tabs.onRemoved.addListener(async (tabId) => {
  // Get the group ID for this tab
  const groupId = await chrome.storage.session.get(tabId.toString());

  // Check auto-close setting
  const { autoCloseTabs } = await chrome.storage.sync.get(["autoCloseTabs"]);

  // Default to true if setting is not explicitly set to false
  if (autoCloseTabs !== false && groupId[tabId.toString()]) {
    const tabGroup = searchGroups.get(groupId[tabId.toString()]);
    if (tabGroup) {
      // Remove all other tabs in the group
      for (const id of tabGroup) {
        if (id !== tabId) {
          try {
            await chrome.tabs.remove(id);
          } catch (e) {
            // Tab might already be closed
          }
        }
      }
      // Clean up
      searchGroups.delete(groupId[tabId.toString()]);
    }
  }
});

// Optional: Set a default suggestion
chrome.omnibox.setDefaultSuggestion({
  description:
    "Search multiple engines: ChatGPT, Google, Perplexity, and Claude",
});
