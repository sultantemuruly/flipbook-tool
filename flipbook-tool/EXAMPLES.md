# Usage Examples for AI Agents

## Basic Example

```json
{
  "size": {
    "width": 400,
    "height": 550,
    "size": "stretch"
  },
  "pages": [
    {
      "type": "cover",
      "title": "My Book",
      "style": {
        "background": {
          "color": "purple"
        },
        "color": "#ffffff",
        "typography": {
          "fontSize": "2.5rem",
          "fontWeight": 700
        }
      }
    },
    {
      "type": "content",
      "content": "This is page content",
      "style": {
        "background": {
          "color": "blue"
        },
        "typography": {
          "fontSize": "1rem"
        }
      }
    }
  ]
}
```

## Advanced Example with Media

```json
{
  "size": {
    "width": 500,
    "height": 700,
    "minWidth": 400,
    "maxWidth": 600,
    "size": "stretch"
  },
  "pages": [
    {
      "type": "cover",
      "title": "Space Exploration",
      "style": {
        "background": {
          "color": {
            "type": "gradient",
            "direction": "135deg",
            "colors": ["#667eea", "#764ba2"]
          }
        },
        "color": "#ffffff"
      }
    },
    {
      "type": "chapter",
      "title": "Chapter 1: Introduction",
      "density": "hard",
      "style": {
        "background": {
          "color": "blue"
        },
        "color": "#0d47a1",
        "typography": {
          "fontSize": "1.5rem",
          "fontWeight": 600
        }
      }
    },
    {
      "type": "content",
      "content": [
        {
          "type": "heading",
          "level": 3,
          "content": "Welcome to Space",
          "style": {
            "typography": {
              "fontSize": "1.3rem",
              "color": "#667eea"
            }
          }
        },
        {
          "type": "text",
          "content": "Space is vast and mysterious..."
        },
        {
          "type": "image",
          "image": {
            "url": "https://picsum.photos/400/300",
            "width": 400,
            "height": 300,
            "borderRadius": 8,
            "objectFit": "cover"
          }
        },
        {
          "type": "video",
          "video": {
            "url": "https://www.youtube.com/watch?v=VIDEO_ID",
            "width": 350,
            "height": 200,
            "borderRadius": 8
          }
        }
      ],
      "style": {
        "background": {
          "color": "cream"
        },
        "typography": {
          "fontSize": "1rem",
          "lineHeight": 1.6,
          "textAlign": "justify"
        },
        "spacing": {
          "padding": 20
        }
      }
    }
  ]
}
```

## Custom Gradient Example

```json
{
  "type": "cover",
  "title": "Custom Gradient",
  "style": {
    "background": {
      "color": {
        "type": "gradient",
        "direction": "45deg",
        "colors": ["#ff6b6b", "#4ecdc4", "#45b7d1"]
      }
    }
  }
}
```

## Full Typography Control

```json
{
  "type": "content",
  "content": "Styled text",
  "style": {
    "typography": {
      "fontSize": "1.2rem",
      "fontFamily": "Georgia, serif",
      "fontWeight": 500,
      "lineHeight": 1.8,
      "letterSpacing": "0.05em",
      "textAlign": "center",
      "textTransform": "uppercase"
    },
    "color": "#333333"
  }
}
```

## Layout Control

```json
{
  "type": "content",
  "style": {
    "layout": {
      "display": "flex",
      "flexDirection": "column",
      "justifyContent": "center",
      "alignItems": "center",
      "gap": 20
    }
  }
}
```

## Image with Full Control

```json
{
  "type": "content",
  "image": {
    "url": "https://example.com/image.jpg",
    "width": 300,
    "height": 200,
    "alt": "Description",
    "objectFit": "cover",
    "objectPosition": "center",
    "borderRadius": 12,
    "margin": {
      "top": 10,
      "bottom": 10,
      "left": "auto",
      "right": "auto"
    }
  }
}
```

## Video with YouTube URL

```json
{
  "type": "content",
  "video": {
    "url": "https://www.youtube.com/watch?v=D70j-NRgNbI",
    "width": 320,
    "height": 180,
    "borderRadius": 10,
    "margin": 15
  }
}
```

