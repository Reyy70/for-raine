# 🎂 A Magical Pixel Art Birthday Gift for Raine ✨

A complete, self-contained, retro 8-bit / 16-bit pixel-art surprise website created especially for **Raine** by **Rey**.

This project is prepared specifically for **free, permanent hosting on GitHub Pages**. Once published, your public link works on any iPhone, Android phone, tablet, or computer anywhere in the world, without needing to be on your Wi-Fi!

---

## 📁 Project Structure

Make sure your repository has these files directly in the root folder:

```text
BB/
├── index.html        # Main webpage (must be directly in the root folder)
├── style.css         # Retro 8-bit/16-bit styles, pixel borders, animations
├── script.js         # Configuration, Web Audio API chiptune music, pixel sky & physics
└── README.md         # Deployment instructions & documentation
```

* **100% Static**: No backend, no database, no Node.js required.
* **Relative Paths Only**: Stylesheet and scripts use `./style.css` and `./script.js` so they work smoothly under any GitHub Pages repository path (`https://<USERNAME>.github.io/<REPO-NAME>/`).
* **Non-Spoiler Browser Tab**: Starts with `Just a Little Something ✨` so Raine won't see any spoilers when opening the link!

---

## 🚀 GitHub Pages Setup (Step-by-Step Guide)

Follow these exact steps to publish your website online:

### Step 1: Create a GitHub Repository
1. Log in to [GitHub.com](https://github.com).
2. Click the **`+`** icon in the top-right corner and select **New repository** (or visit [github.com/new](https://github.com/new)).
3. Enter a **Repository name** (e.g. `for-raine` or `a-little-something`).
4. Set the repository to **Public** (GitHub Pages requires free accounts to use a public repository).
5. Leave "Add a README file" unchecked (we already have our own `README.md`).
6. Click **Create repository**.

---

### Step 2: Upload All Project Files
1. On your new repository page, click the **uploading an existing file** link (or drag and drop).
2. Select or drag all 4 files from your **`BB`** folder:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
   *(Important: Ensure `index.html` is directly in the root of the repository, not tucked inside a nested subfolder).*
3. At the bottom of the page, click the green **Commit changes** button.

---

### Step 3: Enable GitHub Pages
1. Near the top of your repository page, click **Settings** (with the gear icon ⚙️).
2. In the left-hand sidebar menu, click **Pages** (under the "Code and automation" section).
3. Under **Build and deployment > Source**, select **Deploy from a branch**.
4. Under **Branch**:
   - Select **`main`** (or `master`).
   - Leave the folder set to **`/(root)`**.
5. Click the **Save** button.

---

### Step 4: Access Your Live Public Link!
1. Wait about **60–90 seconds** while GitHub builds and publishes your site.
2. Refresh the **Pages** settings screen. You will see a banner at the top:
   > **"Your site is live at https://&lt;USERNAME&gt;.github.io/&lt;REPO-NAME&gt;/"**
3. Open this link on your phone or computer to verify it works.
4. Send the link to Raine!

---

## 🔗 Public Links You Can Send to Raine

Replace `<USERNAME>` and `<REPO-NAME>` with your GitHub account and repo names:

1. **The Secret Unlock Experience (Standard)**:  
   `https://<USERNAME>.github.io/<REPO-NAME>/`  
   *Raine sees the mysterious retro night-sky screen, enters her name `Raine`, and secret code `2003`.*

2. **The Direct Auto-Unlocked Surprise (Skip Password)**:  
   `https://<USERNAME>.github.io/<REPO-NAME>/?unlock=true`  
   *Directly unfolds the grand pixel-art celebration, chiptune music, cake, and letter.*

3. **The Pre-Filled Link**:  
   `https://<USERNAME>.github.io/<REPO-NAME>/?name=Raine&code=2003`

---

## 🔒 Important Note on Security & Passwords

* This website is a fun, romantic digital birthday gift, not a bank vault!
* The name (`Raine`) and code (`2003`) are evaluated in client-side JavaScript.
* **Do not put real banking passwords, private API keys, or sensitive personal data in the code.**

---

## ⚙️ Customizing the Gift

To customize the details at any time, edit [`script.js`](./script.js#L6-L10):

* `CORRECT_NAME = "Raine"`
* `CORRECT_CODE = "2003"`
* `BIRTH_YEAR = "2003"`
* `BIRTHDAY_MESSAGE = ...`
