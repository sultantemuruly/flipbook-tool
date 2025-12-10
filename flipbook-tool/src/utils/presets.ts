/**
 * Preset configurations for common use cases
 */

import { BookSize, BookConfig } from '../types';

// Size presets
export const sizes = {
  mobile: {
    width: 300,
    height: 400,
    minWidth: 200,
    maxWidth: 400,
    minHeight: 300,
    maxHeight: 500,
    size: "stretch" as const,
  },
  tablet: {
    width: 500,
    height: 700,
    minWidth: 400,
    maxWidth: 600,
    minHeight: 500,
    maxHeight: 800,
    size: "stretch" as const,
  },
  desktop: {
    width: 600,
    height: 800,
    minWidth: 500,
    maxWidth: 800,
    minHeight: 600,
    maxHeight: 1000,
    size: "stretch" as const,
  },
  fixed: {
    width: 400,
    height: 550,
    size: "fixed" as const,
  },
};

// Default book settings
export const defaultSettings = {
  showCover: true,
  mobileScrollSupport: true,
  drawShadow: true,
  flippingTime: 1000,
  maxShadowOpacity: 0.5,
  usePortrait: true,
  startPage: 0,
  clickEventForward: true,
  useMouseEvents: true,
  swipeDistance: 30,
  showPageCorners: true,
  disableFlipByClick: false,
};

// Default typography
export const defaultTypography = {
  fontSize: "1rem",
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  fontWeight: 400,
  lineHeight: 1.6,
  letterSpacing: "normal",
  textAlign: "left" as const,
  textTransform: "none" as const,
};

/**
 * Create a book config with defaults
 */
export function createBookConfig(overrides: Partial<BookConfig>): BookConfig {
  return {
    size: sizes.desktop,
    pages: [],
    settings: defaultSettings,
    ...overrides,
  };
}

