/**
 * Color and gradient utilities
 * Provides named colors and gradients for easy agent usage
 */

import { ColorValue, GradientPreset, ColorPreset } from '../types';

// Named color presets
export const colors: ColorPreset = {
  // Blues
  blue: "#e3f2fd",
  blueDark: "#0d47a1",
  blueLight: "#bbdefb",
  
  // Purples
  purple: "#f3e5f5",
  purpleDark: "#4a148c",
  purpleLight: "#e1bee7",
  
  // Pinks
  pink: "#fce4ec",
  pinkDark: "#880e4f",
  pinkLight: "#f8bbd0",
  
  // Greens
  green: "#e8f5e9",
  greenDark: "#1b5e20",
  greenLight: "#c8e6c9",
  
  // Oranges
  orange: "#fff3e0",
  orangeDark: "#e65100",
  orangeLight: "#ffe0b2",
  
  // Teals
  teal: "#e0f2f1",
  tealDark: "#004d40",
  tealLight: "#b2dfdb",
  
  // Yellows
  yellow: "#fff9c4",
  yellowDark: "#f57f17",
  yellowLight: "#fff59d",
  
  // Reds
  red: "#ffebee",
  redDark: "#b71c1c",
  redLight: "#ffcdd2",
  
  // Grays
  gray: "#f5f5f5",
  grayDark: "#424242",
  grayLight: "#e0e0e0",
  
  // Neutrals
  white: "#ffffff",
  black: "#000000",
  cream: "#fff8e1",
  beige: "#fef5e7",
  
  // Special
  lavender: "#ede7f6",
  cyan: "#e0f7fa",
  indigo: "#e8eaf6",
  lime: "#f1f8e9",
  coral: "#ffe0b2",
  rose: "#fce4ec",
  sky: "#e1f5fe",
  violet: "#f3e5f5",
  peach: "#ffccbc",
};

// Gradient presets
export const gradients: GradientPreset = {
  purple: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  pink: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  ocean: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  green: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  sunset: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  blue: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  warm: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  cool: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  dark: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
  light: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
};

/**
 * Resolve color value to CSS string
 */
export function resolveColor(color: ColorValue | undefined): string {
  if (!color) return "transparent";
  
  if (typeof color === "string") {
    // Check if it's a named color
    if (colors[color as keyof typeof colors]) {
      return colors[color as keyof typeof colors];
    }
    // Check if it's a named gradient
    if (gradients[color as keyof typeof gradients]) {
      return gradients[color as keyof typeof gradients];
    }
    // Return as-is (hex, rgb, etc.)
    return color;
  }
  
  if (typeof color === "object") {
    if (color.type === "gradient") {
      const direction = color.direction || "135deg";
      return `linear-gradient(${direction}, ${color.colors.join(", ")})`;
    }
    if (color.type === "named") {
      if (colors[color.value as keyof typeof colors]) {
        return colors[color.value as keyof typeof colors];
      }
      if (gradients[color.value as keyof typeof gradients]) {
        return gradients[color.value as keyof typeof gradients];
      }
      return color.value;
    }
  }
  
  return "transparent";
}

/**
 * Create custom gradient
 */
export function createGradient(
  colors: string[],
  direction: string = "135deg"
): string {
  return `linear-gradient(${direction}, ${colors.join(", ")})`;
}

