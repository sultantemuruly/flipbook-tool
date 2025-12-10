# Flipbook Tool

A highly configurable React component for creating beautiful page-flip books with JSON-based configuration. Designed for AI agents and developers.

> **Built upon [react-pageflip](https://nodlik.github.io/react-pageflip/)** by Oleg Litovski

## 📦 Installation

```bash
npm install flipbook-tool
```

## 🚀 Quick Start

```tsx
import { Book } from 'flipbook-tool';
import type { BookConfig } from 'flipbook-tool';

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
    },
    {
      type: "content",
      content: "Page content here",
      style: {
        background: { color: "cream" }
      }
    }
  ]
};

function App() {
  return <Book config={config} />;
}
```

## 📁 Repository Structure

This repository contains both the npm package and a working example:

```
flipbook-tool/ (GitHub repository)
├── flipbook-tool/          ← 📦 npm package source
│   ├── src/
│   ├── package.json
│   ├── README.md          ← Full package documentation
│   └── dist/
├── src/                    ← 🧪 Example/test project
│   └── components/
│       ├── my-book.tsx    ← Original example
│       └── TestFlipbook.tsx ← JSON config example
├── README.md              ← This file
└── QUICK_START.md         ← Getting started guide
```

## 📚 Documentation

- **Package Documentation:** See [`flipbook-tool/README.md`](./flipbook-tool/README.md)
- **Complete Guide:** See [`flipbook-tool/COMPLETE_GUIDE.md`](./flipbook-tool/COMPLETE_GUIDE.md)
- **AI Agent Guide:** See [`flipbook-tool/AI_AGENT_GUIDE.md`](./flipbook-tool/AI_AGENT_GUIDE.md)
- **Quick Start:** See [`QUICK_START.md`](./QUICK_START.md)

## ✨ Features

- 📖 **JSON-first configuration** - Perfect for AI agents
- 🎨 **40+ named colors & 10+ gradients** - Easy to use presets
- 🖼️ **Media support** - Images and YouTube videos
- 📱 **Fully responsive** - Works on all devices
- 💪 **TypeScript** - Full type safety
- 🤖 **AI-optimized** - Designed for programmatic generation

## 🧪 Running the Examples

This repository includes working examples you can run locally:

```bash
# Clone the repository
git clone https://github.com/sultantemuruly/flipbook-tool.git
cd flipbook-tool

# Install dependencies
npm install

# Run the example
npm run dev
```

Open http://localhost:5173 to see the examples in action.

## 📖 Examples Included

### 1. Original Book (`my-book.tsx`)
- 20 pages with mixed thin/thick pages
- Custom colors for each page
- Embedded image and YouTube video
- Navigation controls

### 2. JSON Config Example (`TestFlipbook.tsx`)
- Demonstrates the JSON-based API
- Shows named colors and gradients
- Includes media embedding
- Perfect starting point for your own books

## 🔧 Development

To work on the package itself:

```bash
cd flipbook-tool
npm install
npm run build  # Build the package
```

## 📤 Publishing

The npm package is published from the `flipbook-tool/` directory:

```bash
cd flipbook-tool
npm publish
```

**Note:** Only the contents of the `flipbook-tool/` folder are published to npm. The examples and test project remain on GitHub for reference.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

This package is built upon the excellent [react-pageflip](https://nodlik.github.io/react-pageflip/) library by [Oleg Litovski](https://github.com/nodlik). We've added:

- JSON-first configuration API
- Named color and gradient presets
- Image and video embedding
- Comprehensive TypeScript types
- AI-agent optimization
- Extensive documentation

Thank you to Oleg Litovski for creating the foundation!

## 🔗 Links

- **npm Package:** https://www.npmjs.com/package/flipbook-tool (after publishing)
- **GitHub Repository:** https://github.com/sultantemuruly/flipbook-tool
- **Original Library:** https://nodlik.github.io/react-pageflip/

---

**Made with ❤️ by Sultan**
