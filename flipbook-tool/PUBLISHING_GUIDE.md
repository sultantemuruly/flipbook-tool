# Publishing to npm - Complete Guide

## 📝 Step 1: Choose Your Package Name

### Recommended Names (in order):

1. **`react-flipbook-ai`** ⭐ BEST CHOICE
   - Clear and descriptive
   - Shows React framework
   - Indicates AI-friendly design
   - Professional and memorable

2. **`flipbook-json`**
   - Emphasizes JSON configuration
   - Simple and direct
   - Easy to remember

3. **`pageflip-builder`**
   - Descriptive and professional
   - "Builder" implies configuration/creation

4. **`react-book-creator`**
   - Clear purpose
   - Professional sounding

5. **`ai-flipbook`**
   - Short and punchy
   - AI-focused

### Check Name Availability

Visit: **https://www.npmjs.com/package/NAME**

Replace `NAME` with your choice. For example:
- https://www.npmjs.com/package/react-flipbook-ai
- https://www.npmjs.com/package/flipbook-json

**If you see "404 - Not Found"** = ✅ Name is available!
**If you see a package page** = ❌ Name is taken, try another

### Alternative: Scoped Package (Always Available!)

Use your npm username as a scope:
```
@YOUR_USERNAME/flipbook-tool
@YOUR_USERNAME/react-flipbook
@YOUR_USERNAME/book-creator
```

This guarantees uniqueness and looks professional!

---

## 🔧 Step 2: Update Package Information

Once you've chosen a name, update these files:

### Update `package.json`

```bash
cd flipbook-tool
```

Open `package.json` and change:

```json
{
  "name": "react-flipbook-ai",  // ← Your chosen name
  "version": "1.0.0",
  "description": "A highly configurable React component for creating page-flip books. Designed for AI agents with JSON-based configuration.",
  "author": "Your Name <your.email@example.com>",  // ← Your info
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/react-flipbook-ai.git"  // ← Your repo
  },
  "keywords": [
    "react",
    "flipbook",
    "page-flip",
    "book",
    "ebook",
    "ai-agent",
    "json-config",
    "configurable",
    "typescript",
    "react-component"
  ],
  "license": "MIT",
  // ... rest stays the same
}
```

**For scoped packages**, use:
```json
{
  "name": "@YOUR_USERNAME/flipbook-tool",
  // ... rest
}
```

---

## 📦 Step 3: Prepare for Publishing

### 3.1: Create npm Account (if you don't have one)

Visit: **https://www.npmjs.com/signup**

Choose a username - you'll need this!

### 3.2: Create `.npmignore` File

Create `flipbook-tool/.npmignore`:

```
# Development files
node_modules
src
*.ts
!*.d.ts
tsconfig.json
tsconfig.node.json
vite.config.ts

# Documentation (keep only README)
COMPLETE_GUIDE.md
AI_AGENT_GUIDE.md
EXAMPLES.md
PACKAGE_SUMMARY.md
TESTING.md
VERIFICATION_CHECKLIST.md
example-usage.tsx

# Git files
.git
.gitignore

# Build files
*.log
*.tgz

# IDE
.vscode
.idea
*.swp
*.swo
.DS_Store
```

This ensures only the built files are published, keeping the package small.

### 3.3: Update README.md

Update the README to use your actual package name:

```bash
# Find and replace in README.md
# Replace: flipbook-tool
# With: react-flipbook-ai (or your chosen name)
```

---

## 🏗️ Step 4: Build the Package

```bash
cd /Users/sultan/Projects/page-flip-test/flipbook-tool

# Install dependencies
npm install

# Build the package
npm run build
```

This creates the `dist/` folder with:
- `dist/index.js` - CommonJS bundle
- `dist/index.esm.js` - ES Module bundle
- `dist/index.d.ts` - TypeScript definitions
- `dist/Book.css` - Styles

**Verify the build:**
```bash
ls -la dist/
```

You should see the files listed above.

---

## 🚀 Step 5: Test Before Publishing

### Option 1: Test with npm link

```bash
# In the flipbook-tool directory
npm link

# In your test project
cd /Users/sultan/Projects/page-flip-test
npm link react-flipbook-ai  # Use your package name
```

### Option 2: Test with npm pack

```bash
cd /Users/sultan/Projects/page-flip-test/flipbook-tool

# Create a tarball
npm pack

# This creates: react-flipbook-ai-1.0.0.tgz

# Install in test project
cd /Users/sultan/Projects/page-flip-test
npm install ./flipbook-tool/react-flipbook-ai-1.0.0.tgz
```

### Update Test Imports

In `src/components/TestFlipbook.tsx`, change:

```tsx
// Old (direct import)
import { Book } from "../../flipbook-tool/src/index";

// New (npm package import)
import { Book } from "react-flipbook-ai";  // Your package name
import type { BookConfig } from "react-flipbook-ai";
```

Test that everything still works:
```bash
npm run dev
```

---

## 📤 Step 6: Publish to npm

### 6.1: Login to npm

```bash
npm login
```

Enter:
- Username
- Password
- Email
- One-time password (if 2FA is enabled)

### 6.2: Publish!

```bash
cd /Users/sultan/Projects/page-flip-test/flipbook-tool

# For regular packages
npm publish

# For scoped packages (add --access public)
npm publish --access public
```

**Success!** 🎉 Your package is now published!

### 6.3: Verify Publication

Visit: `https://www.npmjs.com/package/react-flipbook-ai`

You should see your package page!

---

## ✅ Step 7: Install and Use

Now anyone can install your package:

```bash
npm install react-flipbook-ai
```

Or with Yarn:
```bash
yarn add react-flipbook-ai
```

Usage:
```tsx
import { Book } from 'react-flipbook-ai';
import type { BookConfig } from 'react-flipbook-ai';

const config: BookConfig = {
  size: { width: 400, height: 550 },
  pages: [
    {
      type: "cover",
      title: "My Book",
      style: {
        background: { color: "purple" },
        color: "#ffffff"
      }
    }
  ]
};

<Book config={config} />
```

---

## 🔄 Step 8: Updating Your Package

When you make changes and want to publish an update:

### 8.1: Update Version

Use semantic versioning:

```bash
# Patch (bug fixes): 1.0.0 → 1.0.1
npm version patch

# Minor (new features): 1.0.0 → 1.1.0
npm version minor

# Major (breaking changes): 1.0.0 → 2.0.0
npm version major
```

This automatically updates `package.json` and creates a git tag.

### 8.2: Rebuild

```bash
npm run build
```

### 8.3: Publish Update

```bash
npm publish
```

---

## 🎯 Quick Checklist

Before publishing, make sure:

- [ ] Package name is available on npm
- [ ] `package.json` has correct name, version, author
- [ ] `package.json` has correct repository URL
- [ ] `.npmignore` is created
- [ ] README.md is updated with correct package name
- [ ] Package builds successfully (`npm run build`)
- [ ] `dist/` folder contains all necessary files
- [ ] Package tested locally (npm link or npm pack)
- [ ] Logged into npm (`npm login`)
- [ ] Ready to publish!

---

## 🆘 Troubleshooting

### "Package name already exists"

- Choose a different name
- Use a scoped package: `@YOUR_USERNAME/package-name`

### "You must be logged in"

```bash
npm login
```

### "Need to provide access level"

For scoped packages:
```bash
npm publish --access public
```

### Build fails

```bash
# Clean and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### TypeScript errors

Check:
- `tsconfig.json` is correct
- All imports are valid
- No syntax errors in source files

---

## 📊 After Publishing

### Monitor Your Package

- **npm page**: https://www.npmjs.com/package/YOUR_PACKAGE_NAME
- **Download stats**: Check weekly downloads
- **Issues**: Monitor GitHub issues
- **Updates**: Keep dependencies updated

### Promote Your Package

- Add badges to README:
  ```markdown
  ![npm version](https://img.shields.io/npm/v/react-flipbook-ai.svg)
  ![downloads](https://img.shields.io/npm/dm/react-flipbook-ai.svg)
  ![license](https://img.shields.io/npm/l/react-flipbook-ai.svg)
  ```

- Share on:
  - Twitter
  - Reddit (r/reactjs)
  - Dev.to
  - Product Hunt

### Maintain Your Package

- Respond to issues
- Review pull requests
- Keep dependencies updated
- Add new features based on feedback
- Fix bugs promptly

---

## 🎉 Congratulations!

You've successfully published your npm package! 🚀

Your package is now available for millions of developers worldwide to use.

**Package URL**: https://www.npmjs.com/package/YOUR_PACKAGE_NAME

**Installation**: `npm install YOUR_PACKAGE_NAME`

---

## 📚 Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [npm Package Best Practices](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [npm Publishing Guide](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages)

