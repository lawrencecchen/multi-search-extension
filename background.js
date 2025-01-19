/*
  background.js (service worker in MV3)
  
  This handles omnibox searches and opens
  ChatGPT, Google, and Perplexity in new tabs.
*/

// Handle omnibox input
chrome.omnibox.onInputEntered.addListener((text, disposition) => {
  const encodedQuery = encodeURIComponent(text);

  // Construct the desired URLs
  const chatgptUrl = `https://chatgpt.com/?q=${encodedQuery}&hints=search&ref=ext`;
  const googleUrl = `https://www.google.com/search?q=${encodedQuery}`;
  const perplexUrl = `https://www.perplexity.ai/search/new?q=${encodedQuery}`;
  const ddgRedirectUrl = `https://duckduckgo.com/?q=%5C${encodedQuery}`;

  // If shift was pressed (disposition === "newForegroundTab"), open all tabs
  // Otherwise, replace current tab with ChatGPT and open others in new tabs
  if (disposition === "newForegroundTab") {
    chrome.tabs.create({ url: chatgptUrl });
    chrome.tabs.create({ url: perplexUrl });
    chrome.tabs.create({ url: googleUrl });
    chrome.tabs.create({ url: ddgRedirectUrl });
  } else {
    // Get current tab
    chrome.tabs.update({ url: chatgptUrl });
    chrome.tabs.create({ url: perplexUrl });
    chrome.tabs.create({ url: googleUrl });
    chrome.tabs.create({ url: ddgRedirectUrl });
  }
});

// Optional: Set a default suggestion
chrome.omnibox.setDefaultSuggestion({
  description: "Search multiple engines: ChatGPT, Google, and Perplexity",
});
