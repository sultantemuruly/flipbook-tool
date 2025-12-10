/**
 * Style resolver - converts configuration to inline styles
 */

import React from 'react';
import { PageStyle, Typography, Background, Layout } from '../types';
import { resolveColor } from './colors';

/**
 * Resolve spacing to CSS string
 */
function resolveSpacing(spacing: number | { top?: number; right?: number; bottom?: number; left?: number } | undefined): string {
  if (!spacing) return "0";
  if (typeof spacing === "number") {
    return `${spacing}px`;
  }
  const top = spacing.top ?? 0;
  const right = spacing.right ?? spacing.top ?? 0;
  const bottom = spacing.bottom ?? spacing.top ?? 0;
  const left = spacing.left ?? spacing.right ?? spacing.top ?? 0;
  return `${top}px ${right}px ${bottom}px ${left}px`;
}

/**
 * Resolve border radius
 */
function resolveBorderRadius(radius: number | { topLeft?: number; topRight?: number; bottomLeft?: number; bottomRight?: number } | undefined): string {
  if (!radius) return "0";
  if (typeof radius === "number") {
    return `${radius}px`;
  }
  const topLeft = radius.topLeft ?? 0;
  const topRight = radius.topRight ?? 0;
  const bottomLeft = radius.bottomLeft ?? 0;
  const bottomRight = radius.bottomRight ?? 0;
  return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
}

/**
 * Resolve background to CSS
 */
function resolveBackground(background: Background | undefined): React.CSSProperties {
  if (!background) return {};
  
  const styles: React.CSSProperties = {};
  
  if (background.color) {
    // Prefer gradients for background colors (named colors like "purple" should use gradient)
    styles.background = resolveColor(background.color, true);
  }
  
  if (background.image) {
    styles.backgroundImage = `url(${background.image})`;
    styles.backgroundSize = background.imageSize || "cover";
    styles.backgroundPosition = background.imagePosition || "center";
    styles.backgroundRepeat = background.imageRepeat || "no-repeat";
  }
  
  return styles;
}

/**
 * Resolve typography to CSS
 */
function resolveTypography(typography: Typography | undefined): React.CSSProperties {
  if (!typography) return {};
  
  return {
    fontSize: typography.fontSize,
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight,
    lineHeight: typography.lineHeight,
    letterSpacing: typography.letterSpacing,
    textAlign: typography.textAlign,
    textTransform: typography.textTransform,
  };
}

/**
 * Resolve layout to CSS
 */
function resolveLayout(layout: Layout | undefined): React.CSSProperties {
  if (!layout) return {};
  
  return {
    display: layout.display,
    flexDirection: layout.flexDirection,
    justifyContent: layout.justifyContent,
    alignItems: layout.alignItems,
    flexWrap: layout.flexWrap,
    gap: layout.gap ? `${layout.gap}px` : undefined,
  };
}

/**
 * Convert PageStyle config to React CSSProperties
 */
export function resolvePageStyle(style: PageStyle | undefined): React.CSSProperties {
  if (!style) return {};
  
  const css: React.CSSProperties = {};
  
  // Background
  if (style.background) {
    Object.assign(css, resolveBackground(style.background));
  }
  
  // Color
  if (style.color) {
    css.color = resolveColor(style.color);
  }
  
  // Typography
  if (style.typography) {
    Object.assign(css, resolveTypography(style.typography));
  }
  
  // Spacing
  if (style.spacing) {
    if (style.spacing.padding) {
      css.padding = resolveSpacing(style.spacing.padding);
    }
    if (style.spacing.margin) {
      css.margin = resolveSpacing(style.spacing.margin);
    }
    if (style.spacing.gap) {
      css.gap = `${style.spacing.gap}px`;
    }
  }
  
  // Border
  if (style.border) {
    if (style.border.width) {
      css.borderWidth = `${style.border.width}px`;
    }
    if (style.border.style) {
      css.borderStyle = style.border.style;
    }
    if (style.border.color) {
      css.borderColor = style.border.color;
    }
    if (style.border.radius) {
      css.borderRadius = resolveBorderRadius(style.border.radius);
    }
  }
  
  // Layout
  if (style.layout) {
    Object.assign(css, resolveLayout(style.layout));
  }
  
  // Other properties
  if (style.opacity !== undefined) {
    css.opacity = style.opacity;
  }
  if (style.boxShadow) {
    css.boxShadow = style.boxShadow;
  }
  
  return css;
}

