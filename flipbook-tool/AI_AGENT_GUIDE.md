# AI Agent Guide - Flipbook Tool

This guide is specifically for AI agents that need to generate flipbook configurations.

## Quick Reference

### Basic Structure

Every book needs:
1. **size** - Book dimensions
2. **pages** - Array of page objects

```json
{
  "size": { "width": 400, "height": 550 },
  "pages": [...]
}
```

## Page Types

### 1. Cover Page

Use for front and back covers (thick pages).

```json
{
  "type": "cover",
  "title": "Book Title",
  "style": {
    "background": { "color": "purple" },
    "color": "#ffffff"
  }
}
```

### 2. Chapter Page

Use for chapter dividers (thick pages).

```json
{
  "type": "chapter",
  "title": "Chapter 1: The Beginning",
  "density": "hard",
  "style": {
    "background": { "color": "blue" },
    "color": "#0d47a1"
  }
}
```

### 3. Content Page

Use for regular content (thin pages).

```json
{
  "type": "content",
  "content": "This is the page content.",
  "style": {
    "background": { "color": "cream" }
  }
}
```

## Colors

### Named Colors (Easy)

Just use the name as a string:

```json
"background": { "color": "blue" }
"background": { "color": "purple" }
"background": { "color": "cream" }
```

**Available colors:**
`blue`, `purple`, `pink`, `green`, `orange`, `teal`, `yellow`, `red`, `gray`, `cream`, `beige`, `lavender`, `cyan`, `indigo`, `lime`, `coral`, `rose`, `sky`, `violet`, `peach`, `white`, `black`

**Dark variants:** `blueDark`, `purpleDark`, `pinkDark`, etc.
**Light variants:** `blueLight`, `purpleLight`, `pinkLight`, etc.

### Named Gradients (Easy)

```json
"background": { "color": "purple" }
"background": { "color": "ocean" }
"background": { "color": "sunset" }
```

**Available gradients:**
`purple`, `pink`, `ocean`, `green`, `sunset`, `blue`, `warm`, `cool`, `dark`, `light`

### Custom Colors

```json
"color": "#ff0000"
"color": "rgb(255, 0, 0)"
```

### Custom Gradients

```json
"background": {
  "color": {
    "type": "gradient",
    "direction": "135deg",
    "colors": ["#ff6b6b", "#4ecdc4", "#45b7d1"]
  }
}
```

## Images

### Simple Image

```json
{
  "type": "content",
  "image": {
    "url": "https://example.com/image.jpg",
    "width": 300,
    "height": 200,
    "borderRadius": 8
  }
}
```

### Image in Content Array

```json
{
  "type": "content",
  "content": [
    { "type": "text", "content": "Check out this image:" },
    {
      "type": "image",
      "image": {
        "url": "https://picsum.photos/300/200",
        "width": 300,
        "height": 200,
        "borderRadius": 8,
        "objectFit": "cover"
      }
    }
  ]
}
```

## Videos (YouTube)

### Simple Video

Any YouTube URL format works:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

```json
{
  "type": "content",
  "video": {
    "url": "https://www.youtube.com/watch?v=VIDEO_ID",
    "width": 320,
    "height": 180,
    "borderRadius": 8
  }
}
```

### Video in Content Array

```json
{
  "type": "content",
  "content": [
    { "type": "text", "content": "Watch this tutorial:" },
    {
      "type": "video",
      "video": {
        "url": "https://www.youtube.com/watch?v=VIDEO_ID",
        "width": 320,
        "height": 180
      }
    }
  ]
}
```

## Typography

```json
"typography": {
  "fontSize": "1.5rem",
  "fontWeight": 700,
  "fontFamily": "Arial, sans-serif",
  "lineHeight": 1.6,
  "textAlign": "center"
}
```

**textAlign options:** `"left"`, `"center"`, `"right"`, `"justify"`
**textTransform options:** `"none"`, `"uppercase"`, `"lowercase"`, `"capitalize"`

## Spacing

```json
"spacing": {
  "padding": 20,
  "margin": 10
}
```

Or with individual sides:

```json
"spacing": {
  "padding": {
    "top": 20,
    "right": 15,
    "bottom": 20,
    "left": 15
  }
}
```

## Content Elements

### Text

```json
{ "type": "text", "content": "Your text here" }
```

### Heading

```json
{
  "type": "heading",
  "level": 2,
  "content": "Chapter Title"
}
```

**level options:** 1, 2, 3, 4, 5, or 6 (for H1-H6)

### Divider

```json
{ "type": "divider" }
```

Or with styling:

```json
{
  "type": "divider",
  "style": {
    "border": { "color": "#667eea", "width": 2 }
  }
}
```

### Spacer

```json
{ "type": "spacer", "height": 30 }
```

## Complete Examples

### Example 1: Simple Story Book

```json
{
  "size": { "width": 400, "height": 550 },
  "pages": [
    {
      "type": "cover",
      "title": "My Story",
      "style": {
        "background": { "color": "purple" },
        "color": "#ffffff"
      }
    },
    {
      "type": "content",
      "content": "Once upon a time, in a land far away...",
      "style": {
        "background": { "color": "cream" }
      }
    },
    {
      "type": "content",
      "content": "There lived a brave knight who sought adventure.",
      "style": {
        "background": { "color": "beige" }
      }
    },
    {
      "type": "cover",
      "title": "The End",
      "style": {
        "background": { "color": "pink" },
        "color": "#ffffff"
      }
    }
  ]
}
```

### Example 2: Photo Album

```json
{
  "size": { "width": 400, "height": 550 },
  "pages": [
    {
      "type": "cover",
      "title": "Photo Album 2024",
      "style": {
        "background": { "color": "ocean" },
        "color": "#ffffff"
      }
    },
    {
      "type": "content",
      "title": "Summer Vacation",
      "image": {
        "url": "https://picsum.photos/350/250",
        "width": 350,
        "height": 250,
        "borderRadius": 8
      },
      "style": {
        "background": { "color": "white" }
      }
    },
    {
      "type": "content",
      "title": "Family Gathering",
      "image": {
        "url": "https://picsum.photos/350/250?random=2",
        "width": 350,
        "height": 250,
        "borderRadius": 8
      },
      "style": {
        "background": { "color": "white" }
      }
    }
  ]
}
```

### Example 3: Tutorial Book with Video

```json
{
  "size": { "width": 400, "height": 550 },
  "pages": [
    {
      "type": "cover",
      "title": "How to Code",
      "style": {
        "background": { "color": "blue" },
        "color": "#ffffff"
      }
    },
    {
      "type": "chapter",
      "title": "Lesson 1: Getting Started",
      "density": "hard",
      "style": {
        "background": { "color": "purple" },
        "color": "#ffffff"
      }
    },
    {
      "type": "content",
      "content": [
        {
          "type": "heading",
          "level": 3,
          "content": "Introduction"
        },
        {
          "type": "text",
          "content": "In this lesson, you'll learn the basics of programming."
        },
        {
          "type": "video",
          "video": {
            "url": "https://www.youtube.com/watch?v=VIDEO_ID",
            "width": 320,
            "height": 180,
            "borderRadius": 8
          }
        }
      ],
      "style": {
        "background": { "color": "cream" }
      }
    }
  ]
}
```

### Example 4: Complex Styled Page

```json
{
  "type": "content",
  "content": [
    {
      "type": "heading",
      "level": 2,
      "content": "Beautiful Design",
      "style": {
        "color": "#667eea",
        "typography": {
          "fontSize": "1.8rem",
          "fontWeight": 700,
          "textAlign": "center"
        }
      }
    },
    {
      "type": "divider",
      "style": {
        "border": { "color": "#667eea", "width": 2 }
      }
    },
    {
      "type": "text",
      "content": "This page demonstrates custom styling with typography and colors.",
      "style": {
        "typography": {
          "fontSize": "1.1rem",
          "lineHeight": 1.8,
          "textAlign": "justify"
        }
      }
    },
    {
      "type": "spacer",
      "height": 20
    },
    {
      "type": "image",
      "image": {
        "url": "https://picsum.photos/300/200",
        "width": 300,
        "height": 200,
        "borderRadius": 12,
        "objectFit": "cover"
      }
    }
  ],
  "style": {
    "background": {
      "color": {
        "type": "gradient",
        "direction": "135deg",
        "colors": ["#ffecd2", "#fcb69f"]
      }
    },
    "spacing": {
      "padding": 30
    }
  }
}
```

## Size Presets

Instead of manually specifying dimensions, you can use presets:

- **Mobile:** 300x400
- **Tablet:** 500x700
- **Desktop:** 600x800
- **Fixed:** 400x550

```json
{
  "size": { "width": 400, "height": 550, "size": "stretch" }
}
```

**size options:**
- `"stretch"`: Responsive (scales between min/max)
- `"fixed"`: Fixed size (no scaling)

## Tips for AI Agents

1. **Always start with a cover page** (type: "cover")
2. **Always end with a cover page** for the back
3. **Use chapter pages** to divide sections (they're thicker)
4. **Mix thin and thick pages** for realism:
   - Covers and chapters: `"density": "hard"`
   - Regular content: `"density": "soft"` (default)
5. **Use named colors** first (easier): `"blue"`, `"purple"`, `"cream"`
6. **For gradients**, use named ones: `"purple"`, `"ocean"`, `"sunset"`
7. **For YouTube videos**, any URL format works (auto-converted)
8. **Keep pages under 50** for best performance
9. **Test with simple configs first**, then add complexity
10. **Always provide both width and height** in size

## Common Mistakes to Avoid

❌ **Missing required fields:**
```json
{ "pages": [...] }  // Missing "size"
```

✅ **Correct:**
```json
{ "size": { "width": 400, "height": 550 }, "pages": [...] }
```

---

❌ **Wrong enum values:**
```json
{ "type": "Cover" }  // Wrong case
```

✅ **Correct:**
```json
{ "type": "cover" }  // Lowercase
```

---

❌ **Color in wrong place:**
```json
"typography": { "color": "#ff0000" }  // Wrong!
```

✅ **Correct:**
```json
"color": "#ff0000",  // At style level
"typography": { "fontSize": "1rem" }
```

---

❌ **Empty pages array:**
```json
{ "size": {...}, "pages": [] }  // Book needs pages!
```

✅ **Correct:**
```json
{ "size": {...}, "pages": [{ "type": "cover", "title": "Title" }] }
```

## JSON Schema (for validation)

Use this schema to validate configurations:

```typescript
{
  "type": "object",
  "required": ["size", "pages"],
  "properties": {
    "size": {
      "type": "object",
      "required": ["width", "height"],
      "properties": {
        "width": { "type": "number" },
        "height": { "type": "number" },
        "minWidth": { "type": "number" },
        "maxWidth": { "type": "number" },
        "minHeight": { "type": "number" },
        "maxHeight": { "type": "number" },
        "size": { "enum": ["fixed", "stretch"] }
      }
    },
    "pages": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["type"],
        "properties": {
          "type": { "enum": ["cover", "chapter", "content", "custom"] },
          "density": { "enum": ["soft", "hard"] },
          "title": { "type": "string" },
          "content": {
            "oneOf": [
              { "type": "string" },
              { "type": "array" }
            ]
          }
        }
      }
    }
  }
}
```

## Output Format

When an AI agent generates a config, it should return a valid JSON object that matches the `BookConfig` interface.

The user's application will then render it using:

```typescript
<Book config={generatedConfig} />
```

---

**That's it!** You now have everything you need to generate flipbook configurations.

