/**
 * Main Book Component
 * Accepts JSON configuration and renders a flipbook
 */

import React, { useRef, useState, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import { BookConfig } from '../types';
import { PageRenderer } from './PageRenderer';
import { defaultSettings, defaultTypography } from '../utils/presets';
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

  // Apply global typography if specified
  const globalTypography = config.globalStyle?.typography || defaultTypography;

  return (
    <div className={`book-container ${className}`}>
      <style>
        {`
          .book-container {
            --global-font-size: ${globalTypography.fontSize};
            --global-font-family: ${globalTypography.fontFamily};
            --global-font-weight: ${globalTypography.fontWeight};
            --global-line-height: ${globalTypography.lineHeight};
            --global-text-color: ${config.globalStyle?.colors?.text || "#000"};
          }
        `}
      </style>
      
      <div className="book-wrapper">
        <HTMLFlipBook
          width={size.width}
          height={size.height}
          size={size.size || "stretch"}
          minWidth={size.minWidth}
          maxWidth={size.maxWidth}
          minHeight={size.minHeight}
          maxHeight={size.maxHeight}
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
    </div>
  );
};

