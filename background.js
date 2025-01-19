/*
  background.js (service worker in MV3)
  
  This handles omnibox searches and opens
  ChatGPT, Google, and Perplexity in new tabs.
*/

// Store tab IDs for each search group
let searchGroups = new Map();

// Handle omnibox input
chrome.omnibox.onInputEntered.addListener(async (text, disposition) => {
  const encodedQuery = encodeURIComponent(text);

  // Construct the desired URLs
  const chatgptUrl = `https://chatgpt.com/?q=${encodedQuery}&hints=search&ref=ext`;
  const googleUrl = `https://www.google.com/search?q=${encodedQuery}`;
  const perplexUrl = `https://www.perplexity.ai/search/new?q=${encodedQuery}`;
  const ddgRedirectUrl = `https://duckduckgo.com/?q=%5C${encodedQuery}`;

  let tabIds = [];
  let chatGptTabId;

  if (disposition === "newForegroundTab") {
    // Create all tabs rapidly without waiting
    const tab1 = await chrome.tabs.create({
      url: ddgRedirectUrl,
      active: false,
    });
    const tab2 = await chrome.tabs.create({ url: chatgptUrl, active: false });
    const tab3 = await chrome.tabs.create({ url: perplexUrl, active: false });
    const tab4 = await chrome.tabs.create({ url: googleUrl, active: false });

    // Focus ChatGPT briefly to trigger loading
    await chrome.tabs.update(tab2.id, { active: true });

    // Then switch to Google tab
    await chrome.tabs.update(tab4.id, { active: true });

    tabIds = [tab1.id, tab2.id, tab3.id, tab4.id];
  } else {
    // Update current tab and create others rapidly
    const currentTab = await chrome.tabs.update({
      url: ddgRedirectUrl,
      active: false,
    });
    const tab2 = await chrome.tabs.create({ url: chatgptUrl, active: false });
    const tab3 = await chrome.tabs.create({ url: perplexUrl, active: false });
    const tab4 = await chrome.tabs.create({ url: googleUrl, active: false });

    // Focus ChatGPT briefly to trigger loading
    await chrome.tabs.update(tab2.id, { active: true });

    // Then switch to Google tab
    await chrome.tabs.update(tab4.id, { active: true });

    tabIds = [currentTab.id, tab2.id, tab3.id, tab4.id];
  }

  // Generate a unique group ID
  const groupId = Date.now().toString();
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

  if (groupId[tabId.toString()]) {
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
  description: "Search multiple engines: ChatGPT, Google, and Perplexity",
});
