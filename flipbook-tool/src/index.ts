/**
 * Flipbook Tool - Main Export
 * A configurable React component for creating page-flip books
 * Designed for AI agent consumption via JSON configuration
 */

// Main component
export { Book, type BookProps } from './components/Book';

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
export { colors, gradients, resolveColor, createGradient } from './utils/colors';
export { convertYouTubeUrl, extractYouTubeId, isYouTubeUrl } from './utils/video';
export { sizes, defaultSettings, defaultTypography, createBookConfig } from './utils/presets';
export { resolvePageStyle } from './utils/styleResolver';

// Version
export const VERSION = '1.0.0';

