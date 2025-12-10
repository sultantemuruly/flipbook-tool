/**
 * Type definitions for the Flipbook Tool
 * Designed for AI agent consumption via JSON configuration
 */

// Book size configuration
export interface BookSize {
  width: number;
  height: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  size?: "fixed" | "stretch";
}

// Typography configuration
export interface Typography {
  fontSize?: number | string;
  fontFamily?: string;
  fontWeight?: number | string;
  lineHeight?: number | string;
  letterSpacing?: number | string;
  textAlign?: "left" | "center" | "right" | "justify";
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
}

// Color configuration - supports named colors, hex, rgb, gradients
export type ColorValue = 
  | string // hex, rgb, named color
  | { type: "gradient"; direction?: string; colors: string[] } // gradient
  | { type: "named"; value: string }; // named preset

// Background configuration
export interface Background {
  color?: ColorValue;
  image?: string; // URL
  imageSize?: "cover" | "contain" | "auto";
  imagePosition?: string;
  imageRepeat?: "no-repeat" | "repeat" | "repeat-x" | "repeat-y";
}

// Spacing configuration
export interface Spacing {
  padding?: number | { top?: number; right?: number; bottom?: number; left?: number };
  margin?: number | { top?: number; right?: number; bottom?: number; left?: number };
  gap?: number;
}

// Border configuration
export interface Border {
  width?: number;
  style?: "solid" | "dashed" | "dotted" | "none";
  color?: string;
  radius?: number | { topLeft?: number; topRight?: number; bottomLeft?: number; bottomRight?: number };
}

// Image configuration
export interface ImageConfig {
  url: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  borderRadius?: number;
  margin?: number | { top?: number; right?: number; bottom?: number; left?: number };
}

// Video configuration
export interface VideoConfig {
  url: string; // YouTube URL (will be converted to embed) or direct video URL
  width?: number | string;
  height?: number | string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  borderRadius?: number;
  margin?: number | { top?: number; right?: number; bottom?: number; left?: number };
}

// Layout configuration
export interface Layout {
  display?: "flex" | "block" | "grid";
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: number;
}

// Page style configuration
export interface PageStyle {
  background?: Background;
  color?: ColorValue;
  typography?: Typography;
  spacing?: Spacing;
  border?: Border;
  layout?: Layout;
  opacity?: number;
  boxShadow?: string;
}

// Content element
export interface ContentElement {
  type: "text" | "heading" | "image" | "video" | "divider" | "spacer";
  content?: string; // for text/heading
  level?: 1 | 2 | 3 | 4 | 5 | 6; // for heading
  image?: ImageConfig;
  video?: VideoConfig;
  style?: PageStyle;
  height?: number; // for spacer/divider
}

// Page configuration
export interface PageConfig {
  type: "cover" | "chapter" | "content" | "custom";
  density?: "soft" | "hard"; // page thickness
  number?: number; // page number (auto-generated if not provided)
  
  // Content
  title?: string;
  content?: string | ContentElement[];
  
  // Styling
  style?: PageStyle;
  
  // Media
  image?: ImageConfig;
  video?: VideoConfig;
  
  // Layout
  layout?: Layout;
}

// Book configuration
export interface BookConfig {
  // Basic info
  title?: string;
  
  // Size
  size: BookSize;
  
  // Global styles
  globalStyle?: {
    typography?: Typography;
    colors?: {
      text?: ColorValue;
      background?: Background;
    };
  };
  
  // Pages
  pages: PageConfig[];
  
  // Book settings
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
  
  // Controls
  controls?: {
    show?: boolean;
    position?: "top" | "bottom";
    style?: PageStyle;
  };
}

// Preset types
export interface ColorPreset {
  [key: string]: string;
}

export interface GradientPreset {
  [key: string]: string;
}

export interface SizePreset {
  [key: string]: BookSize;
}

