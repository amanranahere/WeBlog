import React from "react";
import { useEffect, useRef, useState } from "react";

function ScrollingWords() {
  const wordsDivRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const calculateScrollPosition = () => {
      const wordsDiv = wordsDivRef.current;
      if (wordsDiv) {
        const blogDiv = wordsDiv.querySelector(".blog-container");
        if (blogDiv) {
          const viewportHeight = window.innerHeight;
          const blogHeight = blogDiv.offsetHeight;
          const blogTopOffset =
            blogDiv.getBoundingClientRect().top + window.scrollY;
          const newScrollPosition = blogTopOffset - viewportHeight + blogHeight;
          setScrollPosition(newScrollPosition);
        }
      }
    };

    calculateScrollPosition();
    window.addEventListener("resize", calculateScrollPosition);

    return () => window.removeEventListener("resize", calculateScrollPosition);
  }, []);

  useEffect(() => {
    const scrollDuration = 5000;
    const wordsDiv = wordsDivRef.current;

    if (wordsDiv) {
      const startScrollTop = wordsDiv.scrollTop;
      const distanceToScroll = wordsDiv.scrollHeight - wordsDiv.clientHeight;
      let startTime = null;
      const easeOutQuad = (t) => t * (2 - t);
      const smoothScroll = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsedTime = timestamp - startTime;

        const progress = Math.min(elapsedTime / scrollDuration, 1);
        const easedProgress = easeOutQuad(progress);

        const newScrollTop = startScrollTop + distanceToScroll * easedProgress;

        if (newScrollTop >= scrollPosition) {
          wordsDiv.scrollTop = scrollPosition;
        } else {
          wordsDiv.scrollTop = newScrollTop;
          requestAnimationFrame(smoothScroll);
        }
      };

      requestAnimationFrame(smoothScroll);
    }
  }, [scrollPosition]);

  return (
    <div className="flex font-Lato font-extrabold text-[#1f1f24]">
      <div className="h-screen w-1/2 text-[11vw] leading-snug flex justify-end items-end overflow-y-auto">
        <div className="we-container flex flex-col items-center ">We</div>
      </div>

      <div
        ref={wordsDivRef}
        className="h-screen w-1/2 text-[11vw] tracking-tighter leading-snug flex flex-col justify-start items-start overflow-y-auto no-scrollbar"
      >
        <div className="opacity-60">Aspire</div>
        <div className="opacity-60">Dream</div>
        <div className="opacity-60">Explore</div>
        <div className="opacity-60">Inquire</div>
        <div className="opacity-60">Discover</div>
        <div className="opacity-60">Reflect</div>
        <div className="opacity-60">Learn</div>
        <div className="opacity-60">Instruct</div>
        <div className="opacity-60">Illuminate</div>
        <div className="opacity-60">Express</div>
        <div className="opacity-60">Narrate</div>
        <div className="opacity-60">Share</div>
        <div className="opacity-60">Discuss</div>
        <div className="opacity-60">Collaborate</div>
        <div className="opacity-60">Engage</div>
        <div className="opacity-60">Involve</div>
        <div className="opacity-60">Support</div>
        <div className="opacity-60">Empower</div>
        <div className="opacity-60">Contribute</div>
        <div className="opacity-60">Connect</div>
        <div className="opacity-60">Grow</div>
        <div className="opacity-60">Evolve</div>
        <div className="blog-container">Blog</div>
      </div>
    </div>
  );
}

export default ScrollingWords;
