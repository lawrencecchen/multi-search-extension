  # Multi-Search Extension

This Chrome extension intercepts your default searches in the Omnibox (once set as default) and opens three tabs:

1. ChatGPT
2. Claude
3. Perplexity
4. Google
5. DuckDuckGo feeling lucky redirect

immediately to the right of your current tab.


https://github.com/user-attachments/assets/63692042-592f-487a-8190-841922992860


<video width="100%" controls>
  <source src="https://uwirpkasyoaovnbonjzj.supabase.co/storage/v1/object/public/action_demos/multi-search-demo.mov?t=2025-01-19T10%3A56%3A30.928Z" type="video/quicktime">
  Your browser does not support the video tag.
</video>

## Installation

1. **Clone** this repository or [**download the zip file**](./multi-search.zip).
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **"Load unpacked"** and select the folder containing these files.
5. Once loaded, go to `chrome://settings/searchEngines` (or `chrome://settings/search`)
   and find **"MultiSearch"** under **Other search engines**.
6. Click the **three dots** next to **"MultiSearch"** and choose **"Make default"**.
   - Chrome might show a prompt the first time you install.

That's it! Now, whenever you type a query in the Omnibox that's prefixed with `m` (e.g. `m $nvda stock`) and press Enter,
the extension will open ChatGPT, Google, and Perplexity automatically in new tabs.
