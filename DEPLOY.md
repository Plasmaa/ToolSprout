# Deployment Instructions (GitHub Pages)

You have chosen to deploy the **frontend** of this project to GitHub Pages. Since GitHub Pages is a static hosting service, the Django backend will **not** be deployed, but your document generators (Invoice, Certificate, etc.) will work perfectly.

## Prerequisites
- You need a GitHub account.
- You need `git` installed on your computer.

## Step 1: Initialize Git (if not already done)
Open your terminal in the root folder of your project (`e:\Code\Projects\Antigravity\Tools app`) and run:

```bash
git init
git add .
git commit -m "Initial commit"
```

## Step 2: Create a Repository on GitHub
1. Go to [GitHub.com](https://github.com) and sign in.
2. Click the **+** icon in the top right and select **New repository**.
3. Name your repository (e.g., `doctools`).
4. Click **Create repository**.

## Step 3: Link Local Project to GitHub
Copy the commands shown on GitHub under "…or push an existing repository from the command line" and run them in your terminal. They will look like this:

```bash
git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
git branch -M main
git push -u origin main
```

## Step 4: Configure `package.json`
I have already added a placeholder to your `frontend/package.json` file. You need to update it with your actual GitHub details.

1. Open `frontend/package.json`.
2. Find the line: `"homepage": "https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO_NAME>"`
3. Replace `<YOUR_GITHUB_USERNAME>` with your GitHub username.
4. Replace `<YOUR_REPO_NAME>` with the name of your repository (e.g., `doctools`).

## Step 5: Deploy!
Now, run the deployment script from the `frontend` folder:

```bash
cd frontend
npm run deploy
```

## Step 6: Verify
1. Go to your GitHub repository settings.
2. Click on **Pages** in the left sidebar.
3. Ensure the source is set to `gh-pages` branch.
4. Visit the URL provided by GitHub (it might take a minute to update).

**Note:** If you see a blank page, make sure you updated the `homepage` field in `package.json` correctly!
