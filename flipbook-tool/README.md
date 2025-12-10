# Flipbook Tool

A highly configurable React component for creating beautiful page-flip books. Designed for AI agents with JSON-based configuration, supporting full customization of colors, fonts, layouts, images, videos, and more.

> **Built upon [react-pageflip](https://nodlik.github.io/react-pageflip/)**: This package extends the excellent react-pageflip library by Oleg Litovski, adding a JSON-first configuration API, named color/gradient presets, media support, and extensive customization options optimized for AI agents.

## Features

- 📚 **JSON-based Configuration** - Perfect for AI agents
- 🎨 **Full Customization** - Colors, fonts, sizes, layouts, gradients
- 🖼️ **Media Support** - Images and YouTube videos with size control
- 📱 **Responsive** - Works on all screen sizes
- 🎯 **Type-Safe** - Full TypeScript support
- ⚡ **Easy to Use** - Simple API, powerful features

## Installation

```bash
npm install flipbook-tool
```

## Quick Start

```tsx
import { Book } from 'flipbook-tool';

const config = {
  size: { width: 400, height: 550 },
  pages: [
    {
      type: "cover",
      title: "My Book",
      style: {
        background: { color: { type: "gradient", colors: ["#667eea", "#764ba2"] } },
        color: "#ffffff"
      }
    },
    {
      type: "content",
      content: "Hello, world!",
      style: {
        background: { color: "blue" },
        typography: { fontSize: "1.2rem" }
      }
    }
  ]
};

function App() {
  return <Book config={config} />;
}
```

## Configuration

### Book Configuration

```typescript
interface BookConfig {
  title?: string;
  size: BookSize;
  pages: PageConfig[];
  settings?: BookSettings;
  controls?: ControlsConfig;
  globalStyle?: GlobalStyle;
}
```

### Page Types

- `cover` - Cover page (thick by default)
- `chapter` - Chapter divider (thick by default)
- `content` - Regular content page
- `custom` - Fully customizable page

### Styling Options

#### Colors
- Named colors: `"blue"`, `"purple"`, `"green"`, etc.
- Hex colors: `"#e3f2fd"`
- RGB colors: `"rgb(227, 242, 253)"`
- Gradients: `{ type: "gradient", colors: ["#667eea", "#764ba2"] }`
- Named gradients: `"purple"`, `"ocean"`, `"sunset"`, etc.

#### Typography
- `fontSize`: number or string
- `fontFamily`: string
- `fontWeight`: number or string
- `lineHeight`: number or string
- `textAlign`: "left" | "center" | "right" | "justify"
- `textTransform`: "none" | "uppercase" | "lowercase" | "capitalize"

#### Layout
- `display`: "flex" | "block" | "grid"
- `flexDirection`: "row" | "column"
- `justifyContent`: "flex-start" | "center" | "space-between", etc.
- `alignItems`: "flex-start" | "center" | "stretch", etc.
- `gap`: number

### Media Support

#### Images
```typescript
{
  type: "content",
  image: {
    url: "https://example.com/image.jpg",
    width: 300,
    height: 200,
    borderRadius: 8,
    objectFit: "cover"
  }
}
```

#### Videos
```typescript
{
  type: "content",
  video: {
    url: "https://www.youtube.com/watch?v=VIDEO_ID",
    width: 280,
    height: 160,
    borderRadius: 8
  }
}
```

## Examples

### Full Example

```typescript
import { Book } from 'flipbook-tool';

const bookConfig = {
  size: { width: 400, height: 550, size: "stretch" },
  pages: [
    {
      type: "cover",
      title: "My Book",
      style: {
        background: { color: "purple" },
        color: "#ffffff",
        typography: { fontSize: "2.5rem", fontWeight: 700 }
      }
    },
    {
      type: "chapter",
      title: "Chapter 1",
      density: "hard",
      style: {
        background: { color: "blue" },
        color: "#0d47a1",
        typography: { fontSize: "1.5rem" }
      }
    },
    {
      type: "content",
      content: [
        {
          type: "heading",
          level: 3,
          content: "Introduction",
          style: { typography: { fontSize: "1.3rem", color: "#667eea" } }
        },
        {
          type: "text",
          content: "This is the content of the page..."
        },
        {
          type: "image",
          image: {
            url: "https://picsum.photos/300/200",
            width: 300,
            height: 200
          }
        },
        {
          type: "video",
          video: {
            url: "https://www.youtube.com/watch?v=VIDEO_ID",
            width: 280,
            height: 160
          }
        }
      ],
      style: {
        background: { color: "cream" },
        typography: { fontSize: "1rem", lineHeight: 1.6 }
      }
    }
  ]
};

<Book config={bookConfig} />
```

## API Reference

See the [full documentation](./docs/API.md) for complete API reference.

## Acknowledgments

This package is built upon the excellent [react-pageflip](https://nodlik.github.io/react-pageflip/) library by [Oleg Litovski](https://github.com/nodlik). The core page-flipping engine and animations are powered by react-pageflip.

**What we added:**
- JSON-first configuration API optimized for AI agents
- 40+ named colors and 10+ named gradient presets
- Image and YouTube video embedding with sizing controls
- Comprehensive TypeScript type definitions
- Content element system (headings, text, images, videos, dividers, spacers)
- Complete customization of typography, spacing, borders, and layouts
- Extensive documentation and examples for AI agent integration

Thank you to Oleg Litovski for creating the foundation that made this project possible!

## License

MIT

