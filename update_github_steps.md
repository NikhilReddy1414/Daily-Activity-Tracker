# 🧠 How to Update Your Project on GitHub

Follow these steps whenever you update code locally and want to reflect those changes on GitHub.

---

## ✅ 1. Check Which Files Changed

```bash
git status
```

- This shows all modified, added, or deleted files in your repo.
- Usually, JavaScript or HTML/CSS files will appear after an update.

---

## ✅ 2. Stage the Updated Files

To stage **all** changed files:

```bash
git add .
```

Or to add a **specific file** only:

```bash
git add path/to/file.js
```

---

## ✅ 3. Commit with a Meaningful Message

```bash
git commit -m "✨ Add auto-save feature to daily tracker form"
```

> 💡 If you see `nothing to commit`, it means no changes were staged (or no changes exist).

---

## ✅ 4. Push to GitHub

```bash
git push origin main
```

> 🔁 If your default branch is `master`, replace `main` with `master`.

---

## ✅ 5. (Optional) Confirm on GitHub

- Go to your repository URL on GitHub.
- Check the **latest commit** to see your changes are reflected.

---

## 🆘 Common Issues

- **Uncommitted changes warning**: Make sure you `git add` first.
- **Push rejected**: Run `git pull origin main` first if someone else pushed changes.
- **Branch mismatch**: Use `git branch` to check your branch name.

---

📌 Save this as a reference for all future GitHub updates.
