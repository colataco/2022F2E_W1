import { useState, useEffect, useRef } from 'react';

const { innerWidth, innerHeight, addEventListener, removeEventListener } =
  window;

function useScroll<T = any | null>() {
  const [scrollTop, setScrollTop] = useState(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = (e: any) => {
      console.log(
        (e.target.documentElement.scrollTop /
          (e.target.documentElement.scrollHeight -
            e.target.documentElement.clientHeight)) *
          100
      );
      setScrollTop(e.target.documentElement.scrollTop);
      setProgress(
        (e.target.documentElement.scrollTop /
          (e.target.documentElement.scrollHeight -
            e.target.documentElement.clientHeight)) *
          100
      );
    };
    addEventListener('scroll', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
    };
  }, []);

  return {
    scrollTop,
    progress,
  };
}

export default useScroll;
