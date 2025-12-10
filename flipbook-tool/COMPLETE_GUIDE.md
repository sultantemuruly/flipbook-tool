# Flipbook Tool - Complete Guide

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Quick Start](#quick-start)
4. [Core Concepts](#core-concepts)
5. [Configuration Reference](#configuration-reference)
6. [Examples](#examples)
7. [AI Agent Integration](#ai-agent-integration)
8. [API Reference](#api-reference)
9. [Troubleshooting](#troubleshooting)

---

## Overview

Flipbook Tool is a React component library that creates beautiful, page-flipping books with a JSON-based configuration system. It's specifically designed to be easy for AI agents to use, allowing them to generate interactive books by simply providing configuration objects.

### Key Features

✅ **JSON-First Configuration** - Everything is configurable via JSON objects
✅ **Fully Customizable** - Colors, fonts, layouts, spacing, borders, etc.
✅ **Named Presets** - Easy-to-use color and gradient names
✅ **Media Support** - Images and YouTube videos
✅ **Responsive Design** - Works on all screen sizes
✅ **TypeScript** - Full type safety
✅ **AI-Friendly** - Designed for programmatic generation

---

## Installation

### Option 1: Install from npm (After Publishing)

```bash
npm install flipbook-tool
```

### Option 2: Local Development

```bash
# Clone or link the package
cd flipbook-tool
npm install
npm run build
npm link

# In your project
npm link @sultantemuruly/flipbook-tool
```

### Option 3: Direct Import (Testing)

Import directly from the source (as shown in the test):

```tsx
import { Book } from "../../flipbook-tool/src/index";
import type { BookConfig } from "../../flipbook-tool/src/index";
```

---

## Quick Start

### Basic Example

```tsx
import { Book } from 'flipbook-tool';
import type { BookConfig } from 'flipbook-tool';

function MyComponent() {
  const config: BookConfig = {
    size: {
      width: 400,
      height: 550,
    },
    pages: [
      {
        type: "cover",
        title: "My Book",
        style: {
          background: { color: "purple" },
          color: "#ffffff",
        },
      },
      {
        type: "content",
        content: "This is page 1 content!",
        style: {
          background: { color: "cream" },
        },
      },
      {
        type: "cover",
        title: "The End",
        style: {
          background: { color: "pink" },
          color: "#ffffff",
        },
      },
    ],
  };

  return <Book config={config} />;
}
```

---

## Core Concepts

### 1. Book Configuration

Every book is defined by a `BookConfig` object with three main parts:

- **size**: Dimensions and responsive settings
- **pages**: Array of page configurations
- **settings** (optional): Flipbook behavior settings

### 2. Page Types

Four page types are available:

- **cover**: Front/back covers (thick pages)
- **chapter**: Chapter dividers (thick pages)
- **content**: Regular content pages (thin pages)
- **custom**: Fully customizable pages

### 3. Styling System

Everything can be styled using `PageStyle` objects:

- **background**: Colors, gradients, or images
- **typography**: Font size, weight, family, etc.
- **spacing**: Padding, margin, gap
- **border**: Width, style, color, radius
- **layout**: Flexbox settings

### 4. Content Elements

Pages can contain structured content:

- **text**: Paragraphs
- **heading**: H1-H6 headings
- **image**: Images with sizing
- **video**: YouTube videos
- **divider**: Horizontal lines
- **spacer**: Empty space

---

## Configuration Reference

### BookConfig

```typescript
interface BookConfig {
  // Required: Book dimensions
  size: BookSize;
  
  // Required: Array of pages
  pages: PageConfig[];
  
  // Optional: Global styling
  globalStyle?: {
    typography?: Typography;
    colors?: {
      text?: ColorValue;
      background?: Background;
    };
  };
  
  // Optional: Book behavior settings
  settings?: {
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    drawShadow?: boolean;
    flippingTime?: number;
    maxShadowOpacity?: number;
    usePortrait?: boolean;
    startPage?: number;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
  };
  
  // Optional: Navigation controls
  controls?: {
    show?: boolean;
    position?: "top" | "bottom";
    style?: PageStyle;
  };
}
```

### BookSize

```typescript
interface BookSize {
  width: number;              // Page width in pixels
  height: number;             // Page height in pixels
  minWidth?: number;          // Min width for responsive
  maxWidth?: number;          // Max width for responsive
  minHeight?: number;         // Min height for responsive
  maxHeight?: number;         // Max height for responsive
  size?: "fixed" | "stretch"; // Sizing behavior
}
```

**Size Presets:**

```typescript
import { sizes } from '@sultantemuruly/flipbook-tool';

sizes.mobile    // 300x400
sizes.tablet    // 500x700
sizes.desktop   // 600x800
sizes.fixed     // 400x550 (no responsiveness)
```

### PageConfig

```typescript
interface PageConfig {
  // Required: Page type
  type: "cover" | "chapter" | "content" | "custom";
  
  // Optional: Page thickness
  density?: "soft" | "hard"; // Default: soft for content, hard for covers
  
  // Optional: Custom page number
  number?: number; // Auto-generated if not provided
  
  // Optional: Page title
  title?: string;
  
  // Optional: Page content
  content?: string | ContentElement[];
  
  // Optional: Styling
  style?: PageStyle;
  
  // Optional: Direct media (displayed below content)
  image?: ImageConfig;
  video?: VideoConfig;
  
  // Optional: Layout settings
  layout?: Layout;
}
```

### PageStyle

```typescript
interface PageStyle {
  // Background (color, gradient, or image)
  background?: Background;
  
  // Text color
  color?: ColorValue;
  
  // Typography settings
  typography?: Typography;
  
  // Spacing (padding, margin)
  spacing?: Spacing;
  
  // Border settings
  border?: Border;
  
  // Layout (flexbox)
  layout?: Layout;
  
  // Opacity (0-1)
  opacity?: number;
  
  // Box shadow
  boxShadow?: string;
}
```

### ColorValue (Flexible Color System)

```typescript
type ColorValue = 
  | string  // Hex: "#ff0000", RGB: "rgb(255,0,0)", Named: "blue"
  | { type: "gradient"; direction?: string; colors: string[] }
  | { type: "named"; value: string };
```

**Named Colors:**

```typescript
// Available named colors:
"blue", "blueDark", "blueLight",
"purple", "purpleDark", "purpleLight",
"pink", "pinkDark", "pinkLight",
"green", "greenDark", "greenLight",
"orange", "orangeDark", "orangeLight",
"teal", "tealDark", "tealLight",
"yellow", "yellowDark", "yellowLight",
"red", "redDark", "redLight",
"gray", "grayDark", "grayLight",
"white", "black", "cream", "beige",
"lavender", "cyan", "indigo", "lime",
"coral", "rose", "sky", "violet", "peach"
```

**Named Gradients:**

```typescript
// Available named gradients:
"purple", "pink", "ocean", "green", 
"sunset", "blue", "warm", "cool", 
"dark", "light"
```

**Custom Gradient:**

```typescript
background: {
  color: {
    type: "gradient",
    direction: "135deg",
    colors: ["#ff6b6b", "#4ecdc4", "#45b7d1"]
  }
}
```

### Typography

```typescript
interface Typography {
  fontSize?: number | string;        // "1rem" or 16
  fontFamily?: string;               // "Arial, sans-serif"
  fontWeight?: number | string;      // 700 or "bold"
  lineHeight?: number | string;      // 1.6 or "1.6"
  letterSpacing?: number | string;   // "0.05em"
  textAlign?: "left" | "center" | "right" | "justify";
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
}
```

### ImageConfig

```typescript
interface ImageConfig {
  url: string;                       // Image URL (required)
  width?: number | string;           // Width in pixels or CSS
  height?: number | string;          // Height in pixels or CSS
  alt?: string;                      // Alt text
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  objectPosition?: string;           // "center", "top left", etc.
  borderRadius?: number;             // Border radius in pixels
  margin?: number | { top?, right?, bottom?, left? };
}
```

### VideoConfig

```typescript
interface VideoConfig {
  url: string;                       // YouTube URL (auto-converted to embed)
  width?: number | string;           // Default: 280
  height?: number | string;          // Default: 160
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  borderRadius?: number;             // Border radius in pixels
  margin?: number | { top?, right?, bottom?, left? };
}
```

**Supported YouTube URL formats:**

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID` (already embed format)

### ContentElement

```typescript
interface ContentElement {
  type: "text" | "heading" | "image" | "video" | "divider" | "spacer";
  
  // For text/heading
  content?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6; // Heading level
  
  // For image/video
  image?: ImageConfig;
  video?: VideoConfig;
  
  // Styling (applies to this element only)
  style?: PageStyle;
  
  // For spacer/divider
  height?: number;
}
```

---

## Examples

### Example 1: Simple Book

```typescript
const config: BookConfig = {
  size: { width: 400, height: 550 },
  pages: [
    {
      type: "cover",
      title: "My Story",
      style: {
        background: { color: "purple" },
        color: "#ffffff",
      },
    },
    {
      type: "content",
      content: "Once upon a time...",
      style: {
        background: { color: "cream" },
      },
    },
  ],
};
```

### Example 2: Book with Images

```typescript
const config: BookConfig = {
  size: { width: 400, height: 550 },
  pages: [
    {
      type: "cover",
      title: "Photo Album",
      style: {
        background: { color: "ocean" },
        color: "#ffffff",
      },
    },
    {
      type: "content",
      title: "Beautiful Landscape",
      image: {
        url: "https://picsum.photos/400/300",
        width: 350,
        height: 250,
        borderRadius: 8,
        objectFit: "cover",
      },
      style: {
        background: { color: "white" },
      },
    },
  ],
};
```

### Example 3: Book with Videos

```typescript
const config: BookConfig = {
  size: { width: 400, height: 550 },
  pages: [
    {
      type: "content",
      title: "Tutorial Video",
      content: "Watch this tutorial:",
      video: {
        url: "https://www.youtube.com/watch?v=VIDEO_ID",
        width: 320,
        height: 180,
        borderRadius: 8,
      },
      style: {
        background: { color: "lime" },
      },
    },
  ],
};
```

### Example 4: Complex Content Page

```typescript
{
  type: "content",
  content: [
    {
      type: "heading",
      level: 2,
      content: "Chapter 1",
      style: {
        color: "#667eea",
        typography: {
          fontSize: "1.8rem",
          fontWeight: 700,
        },
      },
    },
    {
      type: "text",
      content: "This is the first paragraph.",
    },
    {
      type: "divider",
      style: {
        border: { color: "#667eea", width: 2 },
      },
    },
    {
      type: "image",
      image: {
        url: "https://picsum.photos/300/200",
        width: 300,
        height: 200,
        borderRadius: 8,
      },
    },
    {
      type: "spacer",
      height: 20,
    },
    {
      type: "text",
      content: "This is the second paragraph.",
    },
  ],
  style: {
    background: { color: "cream" },
    spacing: { padding: 30 },
  },
}
```

### Example 5: Custom Gradient Background

```typescript
{
  type: "content",
  title: "Custom Design",
  content: "Beautiful gradient background!",
  style: {
    background: {
      color: {
        type: "gradient",
        direction: "135deg",
        colors: ["#667eea", "#764ba2", "#f093fb"],
      },
    },
    color: "#ffffff",
    typography: {
      fontSize: "1.2rem",
      fontWeight: 600,
      textAlign: "center",
    },
  },
}
```

---

## AI Agent Integration

This library is designed to be easily used by AI agents. Here's how to integrate it with OpenAI Agents SDK:

### Tool Definition for AI Agents

```typescript
import { z } from 'zod';

const bookConfigSchema = z.object({
  size: z.object({
    width: z.number(),
    height: z.number(),
    minWidth: z.number().optional(),
    maxWidth: z.number().optional(),
    minHeight: z.number().optional(),
    maxHeight: z.number().optional(),
    size: z.enum(["fixed", "stretch"]).optional(),
  }),
  pages: z.array(z.object({
    type: z.enum(["cover", "chapter", "content", "custom"]),
    density: z.enum(["soft", "hard"]).optional(),
    title: z.string().optional(),
    content: z.union([
      z.string(),
      z.array(z.object({
        type: z.enum(["text", "heading", "image", "video", "divider", "spacer"]),
        content: z.string().optional(),
        level: z.number().min(1).max(6).optional(),
        // ... more fields
      }))
    ]).optional(),
    style: z.object({
      background: z.object({
        color: z.union([
          z.string(),
          z.object({
            type: z.literal("gradient"),
            direction: z.string().optional(),
            colors: z.array(z.string()),
          }),
        ]).optional(),
      }).optional(),
      color: z.string().optional(),
      typography: z.object({
        fontSize: z.union([z.number(), z.string()]).optional(),
        fontFamily: z.string().optional(),
        fontWeight: z.union([z.number(), z.string()]).optional(),
        // ... more fields
      }).optional(),
      // ... more style fields
    }).optional(),
    image: z.object({
      url: z.string(),
      width: z.union([z.number(), z.string()]).optional(),
      height: z.union([z.number(), z.string()]).optional(),
      // ... more fields
    }).optional(),
    video: z.object({
      url: z.string(),
      width: z.union([z.number(), z.string()]).optional(),
      height: z.union([z.number(), z.string()]).optional(),
      // ... more fields
    }).optional(),
  })),
  globalStyle: z.object({
    typography: z.object({}).optional(),
    colors: z.object({}).optional(),
  }).optional(),
  settings: z.object({
    showCover: z.boolean().optional(),
    mobileScrollSupport: z.boolean().optional(),
    drawShadow: z.boolean().optional(),
    flippingTime: z.number().optional(),
    // ... more settings
  }).optional(),
  controls: z.object({
    show: z.boolean().optional(),
    position: z.enum(["top", "bottom"]).optional(),
  }).optional(),
});

// Tool function
async function createFlipbook(config: z.infer<typeof bookConfigSchema>) {
  // The AI agent provides the config
  // Your app renders it
  return config;
}
```

### Agent Prompts

Provide this information to your AI agent:

```
You can create interactive flip books using the Flipbook Tool.

Available named colors: blue, purple, pink, green, orange, teal, yellow, red, gray, cream, etc.
Available gradients: purple, pink, ocean, green, sunset, blue, warm, cool, dark, light

Example configuration:
{
  "size": { "width": 400, "height": 550 },
  "pages": [
    {
      "type": "cover",
      "title": "Book Title",
      "style": {
        "background": { "color": "purple" },
        "color": "#ffffff"
      }
    },
    {
      "type": "content",
      "content": "Page content here",
      "style": {
        "background": { "color": "cream" }
      }
    }
  ]
}

For videos, use YouTube URLs (watch or embed format).
For images, use any image URL.
For custom gradients, use: { "type": "gradient", "colors": ["#color1", "#color2"] }
```

---

## API Reference

### Exports

```typescript
// Main component
export { Book } from './components/Book';

// Types
export type {
  BookConfig,
  PageConfig,
  BookSize,
  PageStyle,
  Typography,
  Background,
  ColorValue,
  Spacing,
  Border,
  Layout,
  ImageConfig,
  VideoConfig,
  ContentElement,
} from './types';

// Utilities
export { 
  colors,           // Named color map
  gradients,        // Named gradient map
  resolveColor,     // Convert ColorValue to CSS
  createGradient,   // Create custom gradient
} from './utils/colors';

export { 
  convertYouTubeUrl,  // Convert watch URL to embed
  extractYouTubeId,   // Extract video ID
  isYouTubeUrl,       // Check if URL is YouTube
} from './utils/video';

export { 
  sizes,              // Size presets (mobile, tablet, desktop)
  defaultSettings,    // Default book settings
  defaultTypography,  // Default typography
  createBookConfig,   // Create config with defaults
} from './utils/presets';

export { 
  resolvePageStyle,   // Convert PageStyle to CSS
} from './utils/styleResolver';
```

### Component Props

```typescript
interface BookProps {
  config: BookConfig;                                    // Required
  onPageChange?: (page: number) => void;                 // Optional callback
  onOrientationChange?: (orientation: string) => void;   // Optional callback
  onStateChange?: (state: string) => void;               // Optional callback
  className?: string;                                    // Optional CSS class
}
```

---

## Troubleshooting

### Common Issues

#### 1. **Import Errors**

**Problem:** `Cannot find module '@sultantemuruly/flipbook-tool'`

**Solution:**
- Make sure the package is installed: `npm install flipbook-tool`
- Or link it locally: `npm link @sultantemuruly/flipbook-tool`
- Or use direct import from source: `import { Book } from "../../flipbook-tool/src/index"`

#### 2. **TypeScript Errors**

**Problem:** Type errors with `BookConfig`

**Solution:**
- Import types correctly: `import type { BookConfig } from '@sultantemuruly/flipbook-tool'`
- Ensure all required fields are provided (`size` and `pages`)
- Check that enum values match exactly (e.g., `"cover"` not `"Cover"`)

#### 3. **Styles Not Applying**

**Problem:** Custom colors or styles not showing

**Solution:**
- Check that CSS file is imported (it should be automatic)
- Verify color names are spelled correctly
- For custom colors, use hex format: `"#ff0000"`
- Check browser console for CSS errors

#### 4. **Pages Not Rendering**

**Problem:** Book is blank or pages don't appear

**Solution:**
- Ensure `pages` array has at least one page
- Check that page `type` is valid: `"cover"`, `"chapter"`, `"content"`, or `"custom"`
- Verify content is not empty
- Check browser console for React errors

#### 5. **Videos Not Loading**

**Problem:** YouTube video shows error or doesn't load

**Solution:**
- Use proper YouTube URL format (watch or embed)
- Check that video ID is correct
- Ensure video is not private or restricted
- Library automatically converts watch URLs to embed format

#### 6. **Images Not Displaying**

**Problem:** Images don't show or are broken

**Solution:**
- Verify image URL is accessible
- Check CORS policy if loading from external domain
- Ensure image URL is valid and returns an image
- Check network tab in browser DevTools

---

## Performance Tips

1. **Optimize Images:**
   - Use appropriately sized images (don't use 4K images for small displays)
   - Consider using WebP format for better compression
   - Use CDN for faster loading

2. **Limit Page Count:**
   - For better performance, keep books under 50 pages
   - For longer books, consider lazy loading or pagination

3. **Minimize Custom Styles:**
   - Use named colors and gradients when possible
   - Avoid excessive inline styles
   - Reuse style objects across pages

4. **Video Considerations:**
   - Videos add significant weight to the page
   - Consider limiting to 1-2 videos per book
   - Use video thumbnails instead of autoplay

---

## Browser Support

- ✅ Chrome/Edge (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️ IE11 not supported

---

## License

MIT License

---

## Support

For issues, questions, or contributions, please visit:
- GitHub: [sultantemuruly/flipbook-tool](https://github.com/sultantemuruly/flipbook-tool)
- NPM: [@sultantemuruly/flipbook-tool](https://www.npmjs.com/package/flipbook-tool)

---

## Version

Current version: 1.0.0

