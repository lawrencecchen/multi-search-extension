// Extract the query from the URL
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("q") || "";

// Send a message to the background script to handle the search
chrome.runtime.sendMessage({ type: "search", query: query });

// Optionally display a "redirecting" or "loading" message:
document.body.textContent = "Searching...";
