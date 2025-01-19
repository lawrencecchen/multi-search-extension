# Multi-Search Extension

This Chrome extension intercepts your default searches in the Omnibox (once set as default) and opens three tabs:

1. ChatGPT
2. Perplexity
3. Google

in that order, immediately to the right of your current tab.

## Installation

1. **Clone** or **download** this folder to your computer.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **"Load unpacked"** and select the folder containing these files.
5. Once loaded, go to `chrome://settings/searchEngines` (or `chrome://settings/search`)
   and find **"MultiSearch"** under **Other search engines**.
6. Click the **three dots** next to **"MultiSearch"** and choose **"Make default"**.
   - Chrome might show a prompt the first time you install.

That's it! Now, whenever you type a query in the Omnibox (e.g. `whats $nvda stock`) and press Enter,
the extension will open ChatGPT, Google, and Perplexity automatically in new tabs.
