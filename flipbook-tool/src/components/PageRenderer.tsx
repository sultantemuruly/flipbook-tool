/**
 * Page Renderer Component
 * Renders a page based on configuration
 */

import React from 'react';
import { PageConfig, ContentElement, ImageConfig, VideoConfig } from '../types';
import { resolvePageStyle } from '../utils/styleResolver';
import { convertYouTubeUrl } from '../utils/video';

interface PageRendererProps {
  config: PageConfig;
  pageNumber: number;
}

export const PageRenderer = React.forwardRef<HTMLDivElement, PageRendererProps>(
  ({ config, pageNumber }, ref) => {
    const pageStyle = resolvePageStyle(config.style);
    const density = config.density || (config.type === "cover" || config.type === "chapter" ? "hard" : "soft");
    
    // Render content elements
    const renderContent = () => {
      if (typeof config.content === "string") {
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
        case "text":
          return (
            <p key={index} style={elementStyle}>
              {element.content}
            </p>
          );
        
        case "heading":
          const HeadingTag = `h${element.level || 2}` as keyof JSX.IntrinsicElements;
          return (
            <HeadingTag key={index} style={elementStyle}>
              {element.content}
            </HeadingTag>
          );
        
        case "image":
          if (element.image) {
            return renderImage(element.image, index);
          }
          return null;
        
        case "video":
          if (element.video) {
            return renderVideo(element.video, index);
          }
          return null;
        
        case "divider":
          return (
            <hr 
              key={index} 
              style={{
                ...elementStyle,
                height: element.height || 1,
                border: "none",
                borderTop: "1px solid",
                margin: "1rem 0",
              }} 
            />
          );
        
        case "spacer":
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
        width: imageConfig.width || "auto",
        height: imageConfig.height || "auto",
        objectFit: imageConfig.objectFit || "contain",
        objectPosition: imageConfig.objectPosition || "center",
        borderRadius: imageConfig.borderRadius ? `${imageConfig.borderRadius}px` : undefined,
        margin: imageConfig.margin 
          ? (typeof imageConfig.margin === "number" 
              ? `${imageConfig.margin}px` 
              : `${imageConfig.margin.top || 0}px ${imageConfig.margin.right || 0}px ${imageConfig.margin.bottom || 0}px ${imageConfig.margin.left || 0}px`)
          : undefined,
      };
      
      return (
        <div key={key} style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}>
          <img 
            src={imageConfig.url} 
            alt={imageConfig.alt || ""} 
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
        borderRadius: videoConfig.borderRadius ? `${videoConfig.borderRadius}px` : "8px",
        margin: videoConfig.margin 
          ? (typeof videoConfig.margin === "number" 
              ? `${videoConfig.margin}px` 
              : `${videoConfig.margin.top || 0}px ${videoConfig.margin.right || 0}px ${videoConfig.margin.bottom || 0}px ${videoConfig.margin.left || 0}px`)
          : undefined,
      };
      
      return (
        <div key={key} style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}>
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
        className={`page page-${config.type}`}
        data-density={density}
        style={pageStyle}
      >
        <div className="page-content">
          {config.title && (
            <h2 className="page-header" style={config.style?.typography ? resolvePageStyle({ typography: config.style.typography }) : {}}>
              {config.title}
            </h2>
          )}
          
          {renderContent()}
          
          {/* Render direct image/video if specified */}
          {config.image && renderImage(config.image, -1)}
          {config.video && renderVideo(config.video, -2)}
          
          {config.type !== "cover" && (
            <div className="page-footer">{pageNumber}</div>
          )}
        </div>
      </div>
    );
  }
);

PageRenderer.displayName = "PageRenderer";

