import React, { useRef, useState, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import "./my-book.css";

// Page component using forwardRef (required for react-pageflip)
const Page = React.forwardRef<
  HTMLDivElement,
  { 
    number: number; 
    children?: React.ReactNode; 
    density?: "soft" | "hard";
    colorClass?: string;
  }
>((props, ref) => {
  return (
    <div 
      className={`page ${props.colorClass || ''}`}
      ref={ref} 
      data-density={props.density || "soft"}
    >
      <div className="page-content">
        <h2 className="page-header">Page {props.number}</h2>
        <div className="page-text">{props.children}</div>
        <div className="page-footer">{props.number}</div>
      </div>
    </div>
  );
});
Page.displayName = "Page";

// Cover page component
const PageCover = React.forwardRef<
  HTMLDivElement, 
  { 
    children: React.ReactNode;
    colorClass?: string;
  }
>((props, ref) => {
  return (
    <div 
      className={`page page-cover ${props.colorClass || ''}`}
      ref={ref} 
      data-density="hard"
    >
      <div className="page-content">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});
PageCover.displayName = "PageCover";

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

export function MyBook() {
  const flipBook = useRef<HTMLFlipBookRef | null>(null);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [state, setState] = useState<string>("read");

  const nextButtonClick = () => {
    flipBook.current?.pageFlip()?.flipNext();
  };

  const prevButtonClick = () => {
    flipBook.current?.pageFlip()?.flipPrev();
  };

  const onPage = useCallback((e: FlipEvent) => {
    setPage(e.data);
  }, []);

  const onChangeOrientation = useCallback((e: OrientationEvent) => {
    setOrientation(e.data);
  }, []);

  const onChangeState = useCallback((e: StateEvent) => {
    setState(e.data);
  }, []);

  const onInit = useCallback(() => {
    if (flipBook.current) {
      const pageFlip = flipBook.current.pageFlip();
      if (pageFlip) {
        setTotalPage(pageFlip.getPageCount());
      }
    }
  }, []);

  return (
    <div className="book-container">
      <div className="book-wrapper">
        <HTMLFlipBook
          width={400}
          height={550}
          size="stretch"
          minWidth={250}
          maxWidth={500}
          minHeight={350}
          maxHeight={700}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          startPage={0}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          style={{ backgroundColor: '#fff' }}
          onFlip={onPage}
          onChangeOrientation={onChangeOrientation}
          onChangeState={onChangeState}
          onInit={onInit}
          className="my-book"
          ref={flipBook}
        >
          <PageCover colorClass="cover-front">
            MY BOOK
          </PageCover>
          
          {/* Chapter 1 - Thick pages with blue theme */}
          <Page number={1} density="hard" colorClass="page-blue" >
            <h3>Chapter 1: Introduction</h3>
            <p>
              Welcome to this beautiful book with realistic page flipping animations. This is a
              thick page with hard density and a cool blue color scheme.
            </p>
          </Page>
          
          <Page number={2} colorClass="page-cream">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris.
          </Page>
          
          <Page number={3} colorClass="page-purple">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
          </Page>
          
          <Page number={4} colorClass="page-pink">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.
          </Page>
          
          {/* Chapter 2 - Thick page with green theme */}
          <Page number={5} density="hard" colorClass="page-green">
            <h3>Chapter 2: The Journey</h3>
            <p>
              This chapter begins a new section. Notice how thick pages turn differently with
              a more substantial feel. This page has a fresh green color.
            </p>
          </Page>
          
          <Page number={6} colorClass="page-orange">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
            consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </Page>
          
          <Page number={7} colorClass="page-teal">
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
            adipisci velit, sed quia non numquam eius modi tempora incidunt.
          </Page>
          
          <Page number={8} colorClass="page-beige">
            Ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,
            quis nostrum exercitationem ullam corporis suscipit laboriosam.
          </Page>
          
          <Page number={9} colorClass="page-lavender">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
            praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.
          </Page>
          
          {/* Chapter 3 - Thick page with teal theme */}
          <Page number={10} density="hard" colorClass="page-cyan">
            <h3>Chapter 3: Discovery</h3>
            <p>
              The adventure continues with new discoveries and experiences. Thick pages mark
              important sections in the book. This one has a calming teal color.
            </p>
          </Page>
          
          <Page number={11} colorClass="page-yellow">
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum
            soluta nobis est eligendi optio cumque nihil impedit quo minus.
          </Page>
          
          <Page number={12} colorClass="page-red">
            Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
            eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
          </Page>
          
          <Page number={13} colorClass="page-indigo">
            Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus
            maiores alias consequatur aut perferendis doloribus asperiores repellat.
          </Page>
          
          <Page number={14} colorClass="page-lime">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium. The story unfolds with each turn of the page.

            <div style={{ marginTop: '1rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <iframe 
                width="280" 
                height="160" 
                src="https://www.youtube.com/embed/D70j-NRgNbI" 
                title="YouTube video" 
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{ borderRadius: '8px' }}
              ></iframe>
            </div>
          </Page>
          
          {/* Chapter 4 - Thick page with coral theme */}
          <Page number={15} density="hard" colorClass="page-coral">
            <h3>Chapter 4: Conclusion</h3>
            <p>
              As we reach the final chapter, we reflect on the journey. These thick chapter
              dividers help organize the content beautifully. This warm coral color marks
              the final section.
            </p>
            <img src='https://picsum.photos/200/300'></img>
          </Page>
          
          <Page number={16} colorClass="page-light-lime">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.
          </Page>
          
          <Page number={17} colorClass="page-rose">
            Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
          </Page>
          
          <Page number={18} colorClass="page-sky">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error.
          </Page>
          
          <Page number={19} colorClass="page-violet">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
            consequuntur magni dolores eos qui ratione voluptatem sequi.
          </Page>
          
          <Page number={20} colorClass="page-peach">
            <h3>The End</h3>
            <p>
              Thank you for reading this demonstration of the page flip book. We hope you enjoyed
              the realistic turning animations, the mix of thin and thick pages, and the vibrant
              colors throughout!
            </p>
          </Page>
          
          <PageCover colorClass="cover-back">
            THE END
          </PageCover>
    </HTMLFlipBook>
      </div>

      <div className="book-controls">
        <div className="navigation">
          <button type="button" onClick={prevButtonClick} disabled={page === 0}>
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
    </div>
  );
}
