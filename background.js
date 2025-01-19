/*
  background.js (service worker in MV3)
  
  This listens for messages from search.html and opens
  ChatGPT, Google, and Perplexity in new tabs. It also
  closes the temporary search.html tab so that the user
  only ends up with the actual result tabs.
*/

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "search") {
    // The raw query typed into the Omnibox
    const rawQuery = request.query;
    const encodedQuery = encodeURIComponent(rawQuery);

    // Construct the desired URLs
    const chatgptUrl = `https://chatgpt.com/?q=${encodedQuery}&hints=search&ref=ext`;
    const googleUrl = `https://www.google.com/search?q=${encodedQuery}`;
    const perplexUrl = `https://www.perplexity.ai/search/new?q=${encodedQuery}`;

    // Grab the current tab (should be the search.html tab)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs.length) return;

      const currentTabId = tabs[0].id;
      const currentIndex = tabs[0].index;

      // Open ChatGPT to the immediate right, then Google, then Perplexity
      chrome.tabs.create({ url: chatgptUrl, index: currentIndex + 1 });
      chrome.tabs.create({ url: googleUrl, index: currentIndex + 2 });
      chrome.tabs.create({ url: perplexUrl, index: currentIndex + 3 });

      // Optionally close the search.html tab:
      chrome.tabs.remove(currentTabId);
    });
  }
});
