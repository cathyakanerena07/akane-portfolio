# Akane — Web Developer Portfolio

Personal portfolio site built with HTML, CSS, and JavaScript.

**Live site:** *(add Vercel URL here after deploy)*

## Structure

```
index.html          ← entry point
css/style.css       ← all styles
js/main.js          ← interactions (cursor, mask reveal, accordion, form)
project/uploads/    ← images
```

## Setup: contact form email

The contact form uses [Formspree](https://formspree.io) to forward submissions to email.

1. Go to [formspree.io](https://formspree.io) and sign up (free)
2. Click **+ New Form** → enter `byakane.ca@gmail.com`
3. Copy your form ID (looks like `xpzgvwkz`)
4. Open `js/main.js` and replace `YOUR_FORMSPREE_ID` with your ID:
   ```js
   const FORMSPREE_ID = 'xpzgvwkz'; // ← your actual ID
   ```
5. Verify your email when Formspree sends a confirmation

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo
3. No build config needed — click **Deploy**
4. Done ✓
