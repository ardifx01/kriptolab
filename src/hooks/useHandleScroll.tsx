import { useCallback, useEffect, useState } from "react";

const useHandleScroll = () => {
  const [yOffset, setYOffset] = useState<number>(0);

  const onScroll = useCallback(() => {
    const { scrollY } = window;

    setYOffset(scrollY);
  }, []);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return { yOffset };
};

export default useHandleScroll;
