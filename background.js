/*
  background.js (service worker in MV3)
  
  This handles omnibox searches and opens
  ChatGPT, Google, and Perplexity in new tabs.
*/

// Handle omnibox input
chrome.omnibox.onInputEntered.addListener((text) => {
  const encodedQuery = encodeURIComponent(text);

  // Construct the desired URLs
  const chatgptUrl = `https://chatgpt.com/?q=${encodedQuery}&hints=search&ref=ext`;
  const googleUrl = `https://www.google.com/search?q=${encodedQuery}`;
  const perplexUrl = `https://www.perplexity.ai/search/new?q=${encodedQuery}`;

  // Open all search engines in new tabs
  chrome.tabs.create({ url: chatgptUrl });
  chrome.tabs.create({ url: perplexUrl });
  chrome.tabs.create({ url: googleUrl });
});

// Optional: Set a default suggestion
chrome.omnibox.setDefaultSuggestion({
  description: "Search multiple engines: ChatGPT, Google, and Perplexity",
});
