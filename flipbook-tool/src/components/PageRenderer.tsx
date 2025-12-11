/**
 * Page Renderer Component
 * Renders a page based on configuration
 */

import React, { useCallback, useRef, useState } from 'react';
import { PageConfig, ContentElement, ImageConfig, VideoConfig, LayoutElementState, LayoutElementType } from '../types';
import { resolvePageStyle } from '../utils/styleResolver';
import { convertYouTubeUrl } from '../utils/video';

interface PageRendererProps {
  config: PageConfig;
  pageNumber: number;
  pageIndex: number;
  layoutElements?: LayoutElementState[];
  selectedId?: string;
  onSelectElement?: (pageIndex: number, elementId: string) => void;
  onDropNewElement?: (type: LayoutElementType, position: { x: number; y: number }) => void;
  onMoveElement?: (elementId: string, position: { x: number; y: number }) => void;
  onUpdateElement?: (elementId: string, partial: Partial<LayoutElementState>) => void;
}

export const PageRenderer = React.forwardRef<HTMLDivElement, PageRendererProps>(
  (
    {
      config,
      pageNumber,
      pageIndex,
      layoutElements = [],
      selectedId,
      onSelectElement,
      onDropNewElement,
      onMoveElement,
      onUpdateElement,
    },
    ref
  ) => {
    const pageStyle = resolvePageStyle(config.style);
    const density =
      config.density ||
      (config.type === 'cover' || config.type === 'chapter' ? 'hard' : 'soft');

    // Use CSS class instead of inline styles (react-pageflip clones elements, CSS classes work better)
    const pageClassName = `flipbook-page-${pageIndex}`;

    // Build style object for other properties (non-background/color)
    const finalStyle: React.CSSProperties = {};

    // Copy all styles except background/backgroundColor/color (those are in CSS class)
    Object.keys(pageStyle).forEach(key => {
      if (
        key !== 'background' &&
        key !== 'backgroundColor' &&
        key !== 'color'
      ) {
        // Specify type to avoid 'any'
        (finalStyle as Record<string, unknown>)[key] = (pageStyle as Record<string, unknown>)[key];
      }
    });

    const layoutContainerRef = useRef<HTMLDivElement | null>(null);
    const draggingIdRef = useRef<string | null>(null);
    const dragOffsetRef = useRef<{ x: number; y: number } | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const resizingRef = useRef<{
      id: string;
      direction: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
      startX: number;
      startY: number;
      start: { x: number; y: number; width: number; height: number };
    } | null>(null);

    const clampPercent = useCallback((value: number) => Math.min(95, Math.max(0, value)), []);

    const getRelativePosition = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        if (!layoutContainerRef.current) return null;
        const rect = layoutContainerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        return { x: clampPercent(x), y: clampPercent(y) };
      },
      [clampPercent]
    );

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback(() => {
      setIsDragOver(false);
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        const position = getRelativePosition(e);
        if (!position) return;

        const newElementPayload = e.dataTransfer?.getData('application/flipbook-element');
        const moveId = e.dataTransfer?.getData('application/flipbook-element-move');

        if (newElementPayload) {
          try {
            const parsed = JSON.parse(newElementPayload) as { type?: LayoutElementType };
            if (parsed?.type && onDropNewElement) {
              onDropNewElement(parsed.type, position);
            }
          } catch {
            // ignore bad payloads
          }
        } else if (moveId && onMoveElement) {
          const offset = dragOffsetRef.current || { x: 0, y: 0 };
          onMoveElement(moveId, {
            x: clampPercent(position.x - offset.x),
            y: clampPercent(position.y - offset.y),
          });
        }

        draggingIdRef.current = null;
        dragOffsetRef.current = null;
      },
      [clampPercent, getRelativePosition, onDropNewElement, onMoveElement]
    );

    const handleElementDragStart = useCallback(
      (e: React.DragEvent<HTMLDivElement>, element: LayoutElementState) => {
        draggingIdRef.current = element.id;
        if (layoutContainerRef.current) {
          const rect = layoutContainerRef.current.getBoundingClientRect();
          const offsetX = ((e.clientX - rect.left) / rect.width) * 100 - element.x;
          const offsetY = ((e.clientY - rect.top) / rect.height) * 100 - element.y;
          dragOffsetRef.current = { x: offsetX, y: offsetY };
        }

        e.dataTransfer?.setData('application/flipbook-element-move', element.id);
        e.dataTransfer?.setData('text/plain', element.id);
      },
      []
    );

    const handleElementDragEnd = useCallback(() => {
      setIsDragOver(false);
      draggingIdRef.current = null;
      dragOffsetRef.current = null;
    }, []);

    const handleResizeStart = useCallback(
      (e: React.PointerEvent<HTMLDivElement>, element: LayoutElementState, direction: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw') => {
        e.preventDefault();
        e.stopPropagation();
        if (!layoutContainerRef.current) return;
        layoutContainerRef.current.setPointerCapture(e.pointerId);

        resizingRef.current = {
          id: element.id,
          direction,
          startX: e.clientX,
          startY: e.clientY,
          start: { x: element.x, y: element.y, width: element.width, height: element.height },
        };
      },
      []
    );

    const handlePointerMove = useCallback(
      (e: PointerEvent) => {
        if (!resizingRef.current || !layoutContainerRef.current) return;
        const info = resizingRef.current;
        const rect = layoutContainerRef.current.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const dxPercent = ((e.clientX - info.startX) / rect.width) * 100;
        const dyPercent = ((e.clientY - info.startY) / rect.height) * 100;

        let { x, y, width, height } = info.start;

        const minSize = 5;

        if (info.direction.includes('e')) {
          width = clampPercent(info.start.width + dxPercent);
        }
        if (info.direction.includes('s')) {
          height = clampPercent(info.start.height + dyPercent);
        }
        if (info.direction.includes('w')) {
          width = clampPercent(info.start.width - dxPercent);
          x = clampPercent(info.start.x + dxPercent);
        }
        if (info.direction.includes('n')) {
          height = clampPercent(info.start.height - dyPercent);
          y = clampPercent(info.start.y + dyPercent);
        }

        width = Math.max(minSize, width);
        height = Math.max(minSize, height);

        onUpdateElement?.(info.id, { x, y, width, height });
      },
      [clampPercent, onUpdateElement]
    );

    const handlePointerUp = useCallback((e: PointerEvent) => {
      if (resizingRef.current && layoutContainerRef.current) {
        try {
          layoutContainerRef.current.releasePointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }
      resizingRef.current = null;
    }, []);

    React.useEffect(() => {
      const move = (evt: PointerEvent) => handlePointerMove(evt);
      const up = (evt: PointerEvent) => handlePointerUp(evt);
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
      return () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
      };
    }, [handlePointerMove, handlePointerUp]);

    const handleElementClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>, elementId: string) => {
        e.stopPropagation();
        onSelectElement?.(pageIndex, elementId);
      },
      [onSelectElement, pageIndex]
    );

    const renderPlacedElement = useCallback(
      (element: LayoutElementState) => {
        const isSelected = selectedId === element.id;
        const rawColor = (element.color || '').trim().toLowerCase();
        const isWhite =
          rawColor === '#fff' || rawColor === '#ffffff' || rawColor === 'white';
        const textColor = isWhite ? '#111' : element.color || '#111';
        const backgroundColor =
          element.type === 'shape'
            ? element.color || '#e0e0e0'
            : isWhite
            ? '#f3f4f6'
            : 'rgba(255,255,255,0.85)';

        const sharedStyle: React.CSSProperties = {
          position: 'absolute',
          left: `${clampPercent(element.x)}%`,
          top: `${clampPercent(element.y)}%`,
          width: `${clampPercent(element.width)}%`,
          height: `${clampPercent(element.height)}%`,
          zIndex: element.zIndex,
          border: isSelected ? '2px solid #646cff' : '1px dashed rgba(0,0,0,0.25)',
          borderRadius: element.shape === 'circle' ? '50%' : 6,
          background: backgroundColor,
          color: textColor,
          overflow: 'hidden',
          boxShadow: isSelected ? '0 0 0 2px rgba(100,108,255,0.2)' : undefined,
          cursor: 'move',
          userSelect: 'none',
        };

        let inner: React.ReactNode = null;
        switch (element.type) {
          case 'title':
            inner = <h2 className="layout-element-title">{element.content || 'Title'}</h2>;
            break;
          case 'text':
            inner = <p className="layout-element-text">{element.content || 'Text block'}</p>;
            break;
          case 'image':
            inner = (
              <div className="layout-element-media">
                {element.url ? (
                  <img src={element.url} alt={element.content || 'image'} />
                ) : (
                  <span className="layout-element-placeholder">Set image URL</span>
                )}
              </div>
            );
            break;
          case 'video':
            inner = (
              <div className="layout-element-media">
                {element.url ? (
                  <iframe
                    src={convertYouTubeUrl(element.url)}
                    title="Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <span className="layout-element-placeholder">Set video URL</span>
                )}
              </div>
            );
            break;
          case 'shape':
          default:
            inner = <div className="layout-element-shape" />;
            break;
        }

        return (
          <div
            key={element.id}
            className={`layout-element ${isSelected ? 'is-selected' : ''}`}
            draggable
            onDragStart={(evt) => handleElementDragStart(evt, element)}
            onDragEnd={handleElementDragEnd}
            onClick={(evt) => handleElementClick(evt, element.id)}
            style={sharedStyle}
          >
            {inner}
            <div className="resize-handle handle-nw" onPointerDown={(evt) => handleResizeStart(evt, element, 'nw')} />
            <div className="resize-handle handle-n" onPointerDown={(evt) => handleResizeStart(evt, element, 'n')} />
            <div className="resize-handle handle-ne" onPointerDown={(evt) => handleResizeStart(evt, element, 'ne')} />
            <div className="resize-handle handle-e" onPointerDown={(evt) => handleResizeStart(evt, element, 'e')} />
            <div className="resize-handle handle-se" onPointerDown={(evt) => handleResizeStart(evt, element, 'se')} />
            <div className="resize-handle handle-s" onPointerDown={(evt) => handleResizeStart(evt, element, 's')} />
            <div className="resize-handle handle-sw" onPointerDown={(evt) => handleResizeStart(evt, element, 'sw')} />
            <div className="resize-handle handle-w" onPointerDown={(evt) => handleResizeStart(evt, element, 'w')} />
          </div>
        );
      },
      [clampPercent, handleElementClick, handleElementDragEnd, handleElementDragStart, handleResizeStart, selectedId]
    );

    // Render content elements
    const renderContent = () => {
      if (typeof config.content === 'string') {
        return <div className="page-text">{config.content}</div>;
      }

      if (Array.isArray(config.content)) {
        return (
          <div className="page-content-elements">
            {config.content.map((element, index) => renderElement(element, index))}
          </div>
        );
      }

      return null;
    };

    const renderElement = (element: ContentElement, index: number) => {
      const elementStyle = resolvePageStyle(element.style);

      switch (element.type) {
        case 'text':
          return (
            <p key={index} style={elementStyle}>
              {element.content}
            </p>
          );
        case 'heading': {
          const HeadingTag = `h${element.level || 2}` as keyof JSX.IntrinsicElements;
          return (
            <HeadingTag key={index} style={elementStyle}>
              {element.content}
            </HeadingTag>
          );
        }
        case 'image':
          if (element.image) {
            return renderImage(element.image, index);
          }
          return null;
        case 'video':
          if (element.video) {
            return renderVideo(element.video, index);
          }
          return null;
        case 'divider':
          return (
            <hr
              key={index}
              style={{
                ...elementStyle,
                height: element.height || 1,
                border: 'none',
                borderTop: '1px solid',
                margin: '1rem 0',
              }}
            />
          );
        case 'spacer':
          return (
            <div
              key={index}
              style={{
                height: `${element.height || 20}px`,
                ...elementStyle,
              }}
            />
          );
        default:
          return null;
      }
    };

    const renderImage = (imageConfig: ImageConfig, key: number) => {
      const imageStyle: React.CSSProperties = {
        width: imageConfig.width || 'auto',
        height: imageConfig.height || 'auto',
        objectFit: imageConfig.objectFit || 'contain',
        objectPosition: imageConfig.objectPosition || 'center',
        borderRadius: imageConfig.borderRadius
          ? `${imageConfig.borderRadius}px`
          : undefined,
        margin: imageConfig.margin
          ? typeof imageConfig.margin === 'number'
            ? `${imageConfig.margin}px`
            : `${imageConfig.margin.top || 0}px ${imageConfig.margin.right || 0}px ${imageConfig.margin.bottom || 0}px ${imageConfig.margin.left || 0}px`
          : undefined,
      };

      return (
        <div
          key={key}
          style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}
        >
          <img
            src={imageConfig.url}
            alt={imageConfig.alt || ''}
            style={imageStyle}
          />
        </div>
      );
    };

    const renderVideo = (videoConfig: VideoConfig, key: number) => {
      const videoUrl = convertYouTubeUrl(videoConfig.url);
      const videoStyle: React.CSSProperties = {
        width: videoConfig.width || 280,
        height: videoConfig.height || 160,
        borderRadius: videoConfig.borderRadius
          ? `${videoConfig.borderRadius}px`
          : '8px',
        margin: videoConfig.margin
          ? typeof videoConfig.margin === 'number'
            ? `${videoConfig.margin}px`
            : `${videoConfig.margin.top || 0}px ${videoConfig.margin.right || 0}px ${videoConfig.margin.bottom || 0}px ${videoConfig.margin.left || 0}px`
          : undefined,
      };

      return (
        <div
          key={key}
          style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}
        >
          <iframe
            src={videoUrl}
            width={videoConfig.width || 280}
            height={videoConfig.height || 160}
            title="Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={videoStyle}
          />
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={`page page-${config.type} ${pageClassName}`}
        data-density={density}
        style={finalStyle}
      >
        <div className="page-content">
          {config.title && (
            <h2
              className="page-header"
              style={
                config.style?.typography
                  ? resolvePageStyle({ typography: config.style.typography })
                  : {}
              }
            >
              {config.title}
            </h2>
          )}

          {renderContent()}

          {/* Render direct image/video if specified */}
          {config.image && renderImage(config.image, -1)}
          {config.video && renderVideo(config.video, -2)}

          <div
            className={`page-layout-canvas ${isDragOver ? 'is-drag-over' : ''}`}
            ref={layoutContainerRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {layoutElements.map(renderPlacedElement)}
          </div>

          {config.type !== 'cover' && (
            <div className="page-footer">{pageNumber}</div>
          )}
        </div>
      </div>
    );
  }
);

PageRenderer.displayName = "PageRenderer";

