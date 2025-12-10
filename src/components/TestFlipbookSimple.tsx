/**
 * Simplified test to debug color issues
 */

import { Book } from "../../flipbook-tool/src/index";
import type { BookConfig } from "../../flipbook-tool/src/index";

export function TestFlipbookSimple() {
  const config: BookConfig = {
    size: {
      width: 400,
      height: 550,
    },
    pages: [
      {
        type: "cover",
        title: "Test Book",
        style: {
          background: {
            color: {
              type: "gradient",
              direction: "135deg",
              colors: ["#667eea", "#764ba2"]
            }
          },
          color: "#ffffff",
        },
      },
      {
        type: "content",
        content: "This page should have a light blue background",
        style: {
          background: {
            color: "#e3f2fd",
          },
          color: "#0d47a1",
        },
      },
      {
        type: "content",
        content: "This page should have a cream background",
        style: {
          background: {
            color: "#fff8e1",
          },
          color: "#5d4037",
        },
      },
      {
        type: "cover",
        title: "THE END",
        style: {
          background: {
            color: {
              type: "gradient",
              direction: "135deg",
              colors: ["#f093fb", "#f5576c"]
            }
          },
          color: "#ffffff",
        },
      },
    ],
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f0f0f0" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Simple Flipbook Test - Direct Colors
      </h1>
      <Book config={config} />
    </div>
  );
}
