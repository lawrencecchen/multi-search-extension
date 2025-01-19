# Multi-Search Extension

This Chrome extension intercepts your default searches in the Omnibox (once set as default) and opens three tabs:

1. ChatGPT
2. Claude
3. Perplexity
4. Google
5. DuckDuckGo feeling lucky redirect

in that order, immediately to the right of your current tab.

![Demo Video](https://private-user-images.githubusercontent.com/54008264/404657743-a7212e3d-7e8a-4371-9eff-70f0da409e32.mov?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzcyODQzNzYsIm5iZiI6MTczNzI4NDA3NiwicGF0aCI6Ii81NDAwODI2NC80MDQ2NTc3NDMtYTcyMTJlM2QtN2U4YS00MzcxLTllZmYtNzBmMGRhNDA5ZTMyLm1vdj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAxMTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMTE5VDEwNTQzNlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTYyMzdmYzA5MjVkYjk1NDc4YTIyM2ViZDRkMTM3MDQ2NzFlM2U2MjliN2E4NTU1NjVhMTZiN2FhOGE2MWYxNDcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.Fk4Hd5FGWJHtrRCLAYeylw6h42J39U4ambQFnY9rPmE)

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
