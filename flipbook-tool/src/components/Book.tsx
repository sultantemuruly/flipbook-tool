/**
 * Main Book Component
 * Accepts JSON configuration and renders a flipbook
 */

import React, { useRef, useState, useCallback, useEffect, useMemo } from "react";
import HTMLFlipBook from "react-pageflip";
import { BookConfig, LayoutElementState, LayoutElementType, LayoutState } from '../types';
import { PageRenderer } from './PageRenderer';
import { defaultSettings, defaultTypography } from '../utils/presets';
import { resolvePageStyle } from '../utils/styleResolver';
import './Book.css';

interface FlipEvent {
  data: number;
  object: unknown;
}

interface OrientationEvent {
  data: "portrait" | "landscape";
  object: unknown;
}

interface StateEvent {
  data: "user_fold" | "fold_corner" | "flipping" | "read";
  object: unknown;
}

interface PageFlip {
  getPageCount: () => number;
  flipNext: (corner?: "top" | "bottom") => void;
  flipPrev: (corner?: "top" | "bottom") => void;
  turnToPage: (pageNum: number) => void;
  getCurrentPageIndex: () => number;
}

interface HTMLFlipBookRef {
  pageFlip: () => PageFlip;
}

export interface BookProps {
  config: BookConfig;
  onPageChange?: (page: number) => void;
  onOrientationChange?: (orientation: "portrait" | "landscape") => void;
  onStateChange?: (state: string) => void;
  className?: string;
}

export const Book: React.FC<BookProps> = ({
  config,
  onPageChange,
  onOrientationChange,
  onStateChange,
  className = "",
}) => {
  const flipBook = useRef<HTMLFlipBookRef | null>(null);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [state, setState] = useState<string>("read");
  const [layouts, setLayouts] = useState<LayoutState>({});
  const [selectedElement, setSelectedElement] = useState<{ pageIndex: number; id: string } | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const paletteItems = useMemo(
    () => [
      { type: "title" as LayoutElementType, label: "Title", description: "Large heading" },
      { type: "text" as LayoutElementType, label: "Text block", description: "Paragraph text" },
      { type: "image" as LayoutElementType, label: "Image", description: "Place an image URL" },
      { type: "video" as LayoutElementType, label: "Video", description: "YouTube/embed URL" },
      { type: "shape" as LayoutElementType, label: "Shape", description: "Rectangle/Circle accent" },
    ],
    []
  );

  const clampPercent = (value: number) => Math.min(95, Math.max(0, Number.isFinite(value) ? value : 0));

  const nextZIndex = (items: LayoutElementState[]) =>
    items.reduce((max, item) => Math.max(max, item.zIndex || 0), 0) + 1;

  const defaultElement = useCallback(
    (type: LayoutElementType, position: { x: number; y: number }, existing: LayoutElementState[]): LayoutElementState => {
      const id = `el-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const base = {
        id,
        type,
        x: clampPercent(position.x),
        y: clampPercent(position.y),
        zIndex: nextZIndex(existing),
      };

      switch (type) {
        case "title":
          return {
            ...base,
            content: "New Title",
            width: 60,
            height: 12,
            color: "#111",
          };
        case "text":
          return {
            ...base,
            content: "New text block",
            width: 60,
            height: 18,
            color: "#222",
          };
        case "image":
          return {
            ...base,
            url: "https://placehold.co/400x250",
            width: 55,
            height: 30,
            color: "#000",
          };
        case "video":
          return {
            ...base,
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            width: 60,
            height: 34,
            color: "#000",
          };
        case "shape":
        default:
          return {
            ...base,
            width: 40,
            height: 15,
            color: "#e0e0e0",
            shape: "rectangle",
          };
      }
    },
    []
  );

  const updatePageLayouts = useCallback(
    (pageIndex: number, updater: (items: LayoutElementState[]) => LayoutElementState[]) => {
      setLayouts((prev) => {
        const current = prev[pageIndex] || [];
        const updated = updater(current);
        return { ...prev, [pageIndex]: updated };
      });
    },
    []
  );

  const handleAddElement = useCallback(
    (pageIndex: number, type: LayoutElementType, position: { x: number; y: number }) => {
      updatePageLayouts(pageIndex, (items) => {
        const element = defaultElement(type, position, items);
        const adjusted = {
          ...element,
          x: clampPercent(position.x - (element.width || 0) / 2),
          y: clampPercent(position.y - (element.height || 0) / 2),
        };
        setSelectedElement({ pageIndex, id: adjusted.id });
        return [...items, adjusted];
      });
    },
    [defaultElement, updatePageLayouts]
  );

  const handleMoveElement = useCallback(
    (pageIndex: number, id: string, position: { x: number; y: number }) => {
      updatePageLayouts(pageIndex, (items) =>
        items.map((item) =>
          item.id === id
            ? {
                ...item,
                x: clampPercent(position.x),
                y: clampPercent(position.y),
              }
            : item
        )
      );
      setSelectedElement({ pageIndex, id });
    },
    [updatePageLayouts]
  );

  const handleUpdateElement = useCallback(
    (pageIndex: number, id: string, partial: Partial<LayoutElementState>) => {
      updatePageLayouts(pageIndex, (items) =>
        items.map((item) =>
          item.id === id
            ? {
                ...item,
                ...partial,
                width: partial.width !== undefined ? clampPercent(partial.width) : item.width,
                height: partial.height !== undefined ? clampPercent(partial.height) : item.height,
                x: partial.x !== undefined ? clampPercent(partial.x) : item.x,
                y: partial.y !== undefined ? clampPercent(partial.y) : item.y,
                zIndex: partial.zIndex !== undefined ? partial.zIndex : item.zIndex,
              }
            : item
        )
      );
    },
    [updatePageLayouts]
  );

  const handleSelectElement = useCallback((pageIndex: number, id: string) => {
    setSelectedElement({ pageIndex, id });
    setImportError(null);
  }, []);

  const handleUpdateSelected = useCallback(
    (partial: Partial<LayoutElementState>) => {
      if (!selectedElement) return;
      const { pageIndex, id } = selectedElement;
      handleUpdateElement(pageIndex, id, partial);
    },
    [handleUpdateElement, selectedElement]
  );

  const handleDeleteSelected = useCallback(() => {
    if (!selectedElement) return;
    const { pageIndex, id } = selectedElement;
    updatePageLayouts(pageIndex, (items) => items.filter((item) => item.id !== id));
    setSelectedElement(null);
  }, [selectedElement, updatePageLayouts]);

  const handleExportLayouts = useCallback(() => {
    const data = JSON.stringify(layouts, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "flipbook-layout.json";
    link.click();
    URL.revokeObjectURL(url);
  }, [layouts]);

  const handleImportLayouts = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result;
        if (typeof text !== "string") throw new Error("Invalid file");
        const parsed = JSON.parse(text);
        if (typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Layout must be an object");
        setLayouts(parsed as LayoutState);
        setImportError(null);
        setSelectedElement(null);
      } catch (err) {
        setImportError((err as Error).message);
      }
    };
    reader.readAsText(file);
  }, []);

  const handleImportInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleImportLayouts(file);
      }
      e.target.value = "";
    },
    [handleImportLayouts]
  );

  const selectedElementData =
    selectedElement && layouts[selectedElement.pageIndex]
      ? layouts[selectedElement.pageIndex].find((item) => item.id === selectedElement.id) || null
      : null;

  const settings = { ...defaultSettings, ...config.settings };
  const size = config.size;

  const nextButtonClick = () => {
    flipBook.current?.pageFlip()?.flipNext();
  };

  const prevButtonClick = () => {
    flipBook.current?.pageFlip()?.flipPrev();
  };

  const onPage = useCallback((e: FlipEvent) => {
    setPage(e.data);
    onPageChange?.(e.data);
  }, [onPageChange]);

  const onChangeOrientation = useCallback((e: OrientationEvent) => {
    setOrientation(e.data);
    onOrientationChange?.(e.data);
  }, [onOrientationChange]);

  const onChangeState = useCallback((e: StateEvent) => {
    setState(e.data);
    onStateChange?.(e.data);
  }, [onStateChange]);

  const onInit = useCallback(() => {
    if (flipBook.current) {
      const pageFlip = flipBook.current.pageFlip();
      if (pageFlip) {
        setTotalPage(pageFlip.getPageCount());
      }
    }
  }, []);

  // Override transforms for hard pages in portrait mode using JavaScript
  useEffect(() => {
    // Only run in portrait mode - landscape should be completely untouched
    if (orientation !== 'portrait') {
      // Clean up any styles we might have added when switching to landscape
      const bookContainer = document.querySelector('.flipbook-book') as HTMLElement;
      if (bookContainer) {
        const containers = bookContainer.querySelectorAll('.stf__item, .stf__block');
        containers.forEach((container) => {
          const el = container as HTMLElement;
          el.removeAttribute('data-hard-flip');
          // Don't clear styles in landscape - let react-pageflip handle it
        });
      }
      return;
    }

    const bookContainer = document.querySelector('.flipbook-book') as HTMLElement;
    if (!bookContainer) return;

    const applyHardPageAnimations = () => {
      // // Find all hard page containers AND the page elements themselves
      const hardPageContainers = Array.from(bookContainer.querySelectorAll('.stf__item, .stf__block')).filter(
        (container) => {
          const hardPage = container.querySelector('[data-density="hard"]');
          return hardPage !== null;
        }
      ) as HTMLElement[];

      hardPageContainers.forEach((container) => {
        const isFlipping = container.classList.contains('stf__item--flipping') || 
                         container.classList.contains('stf__block--flipping');
        const isTurnBack = container.classList.contains('--turn-back');

        if (isFlipping && !isTurnBack) {
          // Forward flip: slide to left and fade
          // Use CSS custom properties for more reliable override
          container.style.setProperty('--hard-flip-transform', 'translateX(-100%) rotateY(0deg) translateZ(0)', 'important');
          container.style.setProperty('--hard-flip-opacity', '0', 'important');
          container.setAttribute('data-hard-flip', 'forward');
          // Also set directly as fallback
          container.style.setProperty('transform', 'translateX(-100%) rotateY(0deg) translateZ(0)', 'important');
          container.style.setProperty('opacity', '0', 'important');
          container.style.setProperty('transition', 'transform 0.85s ease-out, opacity 0.85s ease-out', 'important');
          container.style.setProperty('animation', 'none', 'important');
        } else if (isFlipping && isTurnBack) {
          // Backward flip: slide from left to center
          container.style.setProperty('--hard-flip-transform', 'translateX(-100%)', 'important');
          container.setAttribute('data-hard-flip', 'backward');
          // Also set directly as fallback
          container.style.setProperty('transform', 'translateX(-100%)', 'important');
          container.style.setProperty('animation', 'hardPageSlideIn 1s ease-in-out forwards', 'important');
          container.style.setProperty('transition', 'none', 'important');
          container.style.setProperty('opacity', '1', 'important');
        } else if (!isFlipping) {
          // Reset when not flipping
          container.removeAttribute('data-hard-flip');
          container.style.removeProperty('--hard-flip-transform');
          container.style.removeProperty('--hard-flip-opacity');
        }
      });
    };

    // Use MutationObserver to watch for class changes
    const observer = new MutationObserver(() => {
      applyHardPageAnimations();
    });

    observer.observe(bookContainer, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    // Use requestAnimationFrame for continuous override
    let rafId: number;
    const continuousOverride = () => {
      if (orientation === 'portrait') {
        applyHardPageAnimations();
        rafId = requestAnimationFrame(continuousOverride);
      }
    };
    rafId = requestAnimationFrame(continuousOverride);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [orientation, state]);

  // Apply global typography if specified
  const globalTypography = config.globalStyle?.typography || defaultTypography;

  // Generate CSS classes for each page's styles (react-pageflip clones elements, so CSS classes work better than inline styles)
  const generatePageStyles = () => {
    const styles: string[] = [];
    
    // Global styles
    styles.push(`
      .book-container {
        --global-font-size: ${globalTypography.fontSize};
        --global-font-family: ${globalTypography.fontFamily};
        --global-font-weight: ${globalTypography.fontWeight};
        --global-line-height: ${globalTypography.lineHeight};
        --global-text-color: ${config.globalStyle?.colors?.text || "#000"};
      }
    `);
    
    // Generate unique class for each page
    config.pages.forEach((pageConfig, index) => {
      if (!pageConfig.style) return;
      
      const pageStyle = resolvePageStyle(pageConfig.style);
      const bgValue = pageStyle.background || pageStyle.backgroundColor;
      const colorValue = pageStyle.color;
      
      // Create unique class name
      const className = `flipbook-page-${index}`;
      
      let css = `.${className} {`;
      
      if (bgValue && typeof bgValue === 'string') {
        if (bgValue.includes('gradient')) {
          css += `background: ${bgValue};`;
        } else {
          css += `background-color: ${bgValue};`;
        }
      } else {
        css += `background-color: white;`;
      }
      
      if (colorValue && typeof colorValue === 'string') {
        css += `color: ${colorValue};`;
      } else {
        css += `color: black;`;
      }
      
      // Add other styles
      if (pageStyle.padding) css += `padding: ${pageStyle.padding};`;
      if (pageStyle.margin) css += `margin: ${pageStyle.margin};`;
      if (pageStyle.fontSize) css += `font-size: ${pageStyle.fontSize};`;
      if (pageStyle.fontWeight) css += `font-weight: ${pageStyle.fontWeight};`;
      if (pageStyle.textAlign) css += `text-align: ${pageStyle.textAlign};`;
      
      css += `}`;
      styles.push(css);
    });
    
    return styles.join('\n');
  };

  return (
    <div className={`book-container ${className}`}>
      <style>
        {generatePageStyles()}
      </style>

      <div className="book-builder">
        <div className="builder-pane">
          <div className="pane-header">
            <div>
              <h3>Element palette</h3>
              <p className="muted">Drag onto a page or click to add to the current page.</p>
            </div>
          </div>

          <div className="palette-grid">
            {paletteItems.map((item) => (
              <button
                key={item.type}
                type="button"
                className="palette-item"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer?.setData('application/flipbook-element', JSON.stringify({ type: item.type }));
                  e.dataTransfer?.setData('text/plain', item.label);
                }}
                onClick={() => handleAddElement(page, item.type, { x: 50, y: 50 })}
              >
                <span className="palette-item-label">{item.label}</span>
                <span className="palette-item-desc">{item.description}</span>
              </button>
            ))}
          </div>

          <div className="layout-io">
            <button type="button" onClick={handleExportLayouts}>
              Export layout JSON
            </button>
            <label className="import-button">
              <input type="file" accept="application/json,.json" onChange={handleImportInput} />
              Import layout JSON
            </label>
            {importError && <div className="import-error">Import failed: {importError}</div>}
          </div>
        </div>

        <div className="builder-stage">
          <div className="stage-header">
            <div>
              <span className="mode-pill">{isEditMode ? "Edit mode" : "Preview mode"}</span>
              <p className="muted">
                {isEditMode ? "Edit pages without flips; drag/drop and edit freely." : "Flip through the book to review pages."}
              </p>
            </div>
            <button
              type="button"
              className="ghost-button"
              onClick={() => setIsEditMode((v) => !v)}
            >
              {isEditMode ? "Exit edit mode" : "Enter edit mode"}
            </button>
          </div>

          {isEditMode ? (
            <div className="edit-pages">
              {config.pages.map((pageConfig, index) => {
                const pageNumber = pageConfig.number !== undefined ? pageConfig.number : index + 1;
                return (
                  <div
                    key={`page-edit-${index}`}
                    className="page-preview"
                    style={{
                      width: size.width,
                      height: size.height,
                      maxWidth: "100%",
                    }}
                  >
                    <PageRenderer
                      config={pageConfig}
                      pageNumber={pageNumber}
                      pageIndex={index}
                      layoutElements={layouts[index] || []}
                      selectedId={
                        selectedElement && selectedElement.pageIndex === index ? selectedElement.id : undefined
                      }
                      onSelectElement={handleSelectElement}
                      onDropNewElement={(type, position) => handleAddElement(index, type, position)}
                      onMoveElement={(id, position) => handleMoveElement(index, id, position)}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <div className="book-wrapper">
                <HTMLFlipBook
                  width={size.width}
                  height={size.height}
                  size={size.size || "stretch"}
                  minWidth={size.minWidth || 100}
                  maxWidth={size.maxWidth || 2000}
                  minHeight={size.minHeight || 100}
                  maxHeight={size.maxHeight || 2000}
                  maxShadowOpacity={settings.maxShadowOpacity}
                  showCover={settings.showCover}
                  mobileScrollSupport={settings.mobileScrollSupport}
                  drawShadow={settings.drawShadow}
                  flippingTime={settings.flippingTime}
                  usePortrait={settings.usePortrait}
                  startZIndex={0}
                  autoSize={true}
                  startPage={settings.startPage}
                  clickEventForward={settings.clickEventForward}
                  useMouseEvents={settings.useMouseEvents}
                  swipeDistance={settings.swipeDistance}
                  showPageCorners={settings.showPageCorners}
                  disableFlipByClick={settings.disableFlipByClick}
                  style={{ backgroundColor: '#fff' }}
                  onFlip={onPage}
                  onChangeOrientation={onChangeOrientation}
                  onChangeState={onChangeState}
                  onInit={onInit}
                  className="flipbook-book"
                  ref={flipBook}
                >
                  {config.pages.map((pageConfig, index) => {
                    const pageNumber = pageConfig.number !== undefined ? pageConfig.number : index + 1;
                    // HTMLFlipBook clones children and needs refs, so we use a function to create the element
                    return (
                      <PageRenderer
                        key={`page-${index}`}
                        config={pageConfig}
                        pageNumber={pageNumber}
                        pageIndex={index}
                        layoutElements={layouts[index] || []}
                        selectedId={
                          selectedElement && selectedElement.pageIndex === index ? selectedElement.id : undefined
                        }
                        onSelectElement={handleSelectElement}
                        onDropNewElement={(type, position) => handleAddElement(index, type, position)}
                        onMoveElement={(id, position) => handleMoveElement(index, id, position)}
                        onUpdateElement={(id, partial) => handleUpdateElement(index, id, partial)}
                      />
                    );
                  })}
                </HTMLFlipBook>
              </div>

              {config.controls?.show !== false && (
                <div className="book-controls">
                  <div className="navigation">
                    <button
                      type="button"
                      onClick={prevButtonClick}
                      disabled={page === 0}
                    >
                      Previous page
                    </button>
                    <span className="page-indicator">
                      Page {page + 1} of {totalPage}
                    </span>
                    <button
                      type="button"
                      onClick={nextButtonClick}
                      disabled={page === totalPage - 1}
                    >
                      Next page
                    </button>
                  </div>
                  <div className="book-info">
                    State: <i>{state}</i>, Orientation: <i>{orientation}</i>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="builder-pane">
          <div className="pane-header">
            <div>
              <h3>Inspector</h3>
              <p className="muted">
                {selectedElementData
                  ? `Editing element on page ${(selectedElement?.pageIndex ?? page) + 1}`
                  : 'Select or drop an element to edit it.'}
              </p>
            </div>
          </div>

          {selectedElementData ? (
            <div className="inspector">
              <div className="inspector-row">
                <span className="label">Type</span>
                <span className="pill">{selectedElementData.type}</span>
              </div>

              <div className="inspector-grid">
                <label>
                  X (%)
                  <input
                    type="number"
                    value={selectedElementData.x}
                    onChange={(e) => handleUpdateSelected({ x: Number(e.target.value) || 0 })}
                  />
                </label>
                <label>
                  Y (%)
                  <input
                    type="number"
                    value={selectedElementData.y}
                    onChange={(e) => handleUpdateSelected({ y: Number(e.target.value) || 0 })}
                  />
                </label>
                <label>
                  Width (%)
                  <input
                    type="number"
                    value={selectedElementData.width}
                    onChange={(e) => handleUpdateSelected({ width: Number(e.target.value) || 0 })}
                  />
                </label>
                <label>
                  Height (%)
                  <input
                    type="number"
                    value={selectedElementData.height}
                    onChange={(e) => handleUpdateSelected({ height: Number(e.target.value) || 0 })}
                  />
                </label>
                <label>
                  z-index
                  <input
                    type="number"
                    value={selectedElementData.zIndex}
                    onChange={(e) => handleUpdateSelected({ zIndex: Number(e.target.value) || 0 })}
                  />
                </label>
              </div>

              {(selectedElementData.type === "text" || selectedElementData.type === "title") && (
                <label className="inspector-stack">
                  Content
                  <textarea
                    value={selectedElementData.content || ""}
                    onChange={(e) => handleUpdateSelected({ content: e.target.value })}
                    rows={3}
                  />
                </label>
              )}

              {(selectedElementData.type === "image" || selectedElementData.type === "video") && (
                <label className="inspector-stack">
                  URL
                  <input
                    type="text"
                    value={selectedElementData.url || ""}
                    onChange={(e) => handleUpdateSelected({ url: e.target.value })}
                    placeholder={selectedElementData.type === "image" ? "https://example.com/image.jpg" : "https://youtube.com/..."}
                  />
                </label>
              )}

              <label className="inspector-stack">
                Color
                <input
                  type="text"
                  value={selectedElementData.color || ""}
                  onChange={(e) => handleUpdateSelected({ color: e.target.value })}
                  placeholder="#111 or named color"
                />
              </label>

              {selectedElementData.type === "shape" && (
                <label className="inspector-stack">
                  Shape
                  <select
                    value={selectedElementData.shape || "rectangle"}
                    onChange={(e) => handleUpdateSelected({ shape: e.target.value as LayoutElementState["shape"] })}
                  >
                    <option value="rectangle">Rectangle</option>
                    <option value="circle">Circle</option>
                  </select>
                </label>
              )}

              <div className="inspector-actions">
                <button type="button" className="danger" onClick={handleDeleteSelected}>
                  Delete element
                </button>
              </div>
            </div>
          ) : (
            <p className="muted">Select or drop an element to edit it.</p>
          )}
        </div>
      </div>
    </div>
  );
};

