/**
 * Test component for the new Flipbook Tool
 * Tests the JSON-based configuration API
 */

import { Book } from "../../flipbook-tool/src/index";
import type { BookConfig } from "../../flipbook-tool/src/index";

export function TestFlipbook() {
  // Test config 1: Simple book
  const simpleConfig: BookConfig = {
    size: {
      width: 400,
      height: 550,
      size: "stretch",
      minWidth: 250,
      maxWidth: 500,
      minHeight: 350,
      maxHeight: 700,
    },
    pages: [
      {
        type: "cover",
        title: "Test Book",
        style: {
          background: {
            color: "purple", // Named gradient
          },
          color: "#ffffff",
          typography: {
            fontSize: "2.5rem",
            fontWeight: 700,
          },
        },
      },
      {
        type: "chapter",
        title: "Chapter 1: Introduction",
        density: "hard",
        style: {
          background: {
            color: "blue", // Named color
          },
          color: "#0d47a1",
          typography: {
            fontSize: "1.5rem",
            fontWeight: 600,
          },
        },
      },
      {
        type: "content",
        content: [
          {
            type: "heading",
            level: 3,
            content: "Welcome!",
            style: {
              color: "#667eea",
              typography: {
                fontSize: "1.3rem",
              },
            },
          },
          {
            type: "text",
            content: "This is a test of the new Flipbook Tool. It supports full customization through JSON configuration, perfect for AI agents!",
          },
          {
            type: "image",
            image: {
              url: "https://picsum.photos/300/200",
              width: 300,
              height: 200,
              borderRadius: 8,
              objectFit: "cover",
            },
          },
        ],
        style: {
          background: {
            color: "cream",
          },
          typography: {
            fontSize: "1rem",
            lineHeight: 1.6,
            textAlign: "justify",
          },
          spacing: {
            padding: 20,
          },
        },
      },
      {
        type: "content",
        content: "This page has a video embedded below:",
        video: {
          url: "https://www.youtube.com/watch?v=D70j-NRgNbI",
          width: 320,
          height: 180,
          borderRadius: 8,
        },
        style: {
          background: {
            color: "lime",
          },
          typography: {
            fontSize: "1rem",
          },
        },
      },
      {
        type: "content",
        content: [
          {
            type: "heading",
            level: 3,
            content: "Custom Gradient",
          },
          {
            type: "text",
            content: "This page uses a custom gradient background!",
          },
        ],
        style: {
          background: {
            color: {
              type: "gradient",
              direction: "135deg",
              colors: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
            },
          },
          color: "#ffffff",
          typography: {
            fontSize: "1.1rem",
            fontWeight: 500,
          },
        },
      },
      {
        type: "cover",
        title: "THE END",
        style: {
          background: {
            color: "pink", // Named gradient
          },
          color: "#ffffff",
        },
      },
    ],
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Flipbook Tool Test
      </h1>
      <Book config={simpleConfig} />
    </div>
  );
}

