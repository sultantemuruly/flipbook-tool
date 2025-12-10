/**
 * Example usage of the Flipbook Tool
 * This shows how AI agents would use the package
 */

import { Book, BookConfig } from './src/index';

// Example 1: Simple book
const simpleBook: BookConfig = {
  size: { width: 400, height: 550, size: "stretch" },
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
      content: "Hello, world!",
      style: {
        background: { color: "blue" }
      }
    }
  ]
};

// Example 2: Advanced book with media
const advancedBook: BookConfig = {
  size: {
    width: 500,
    height: 700,
    minWidth: 400,
    maxWidth: 600,
    size: "stretch"
  },
  pages: [
    {
      type: "cover",
      title: "Space Exploration",
      style: {
        background: {
          color: {
            type: "gradient",
            direction: "135deg",
            colors: ["#667eea", "#764ba2"]
          }
        },
        color: "#ffffff",
        typography: {
          fontSize: "2.5rem",
          fontWeight: 700
        }
      }
    },
    {
      type: "chapter",
      title: "Chapter 1: Introduction",
      density: "hard",
      style: {
        background: { color: "blue" },
        color: "#0d47a1",
        typography: {
          fontSize: "1.5rem",
          fontWeight: 600
        }
      }
    },
    {
      type: "content",
      content: [
        {
          type: "heading",
          level: 3,
          content: "Welcome to Space",
          style: {
            typography: {
              fontSize: "1.3rem",
              color: "#667eea"
            }
          }
        },
        {
          type: "text",
          content: "Space is vast and mysterious. Let's explore together!"
        },
        {
          type: "image",
          image: {
            url: "https://picsum.photos/400/300",
            width: 400,
            height: 300,
            borderRadius: 8,
            objectFit: "cover"
          }
        },
        {
          type: "video",
          video: {
            url: "https://www.youtube.com/watch?v=D70j-NRgNbI",
            width: 350,
            height: 200,
            borderRadius: 8
          }
        }
      ],
      style: {
        background: { color: "cream" },
        typography: {
          fontSize: "1rem",
          lineHeight: 1.6,
          textAlign: "justify"
        },
        spacing: {
          padding: 20
        }
      }
    }
  ]
};

// Usage in React component
function App() {
  return (
    <div>
      <h1>Simple Book</h1>
      <Book config={simpleBook} />
      
      <h1>Advanced Book</h1>
      <Book config={advancedBook} />
    </div>
  );
}

export default App;

