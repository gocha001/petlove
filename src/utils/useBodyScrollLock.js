import { useLayoutEffect } from "react";

const getScrollbarWidth = () => {
  const scrollDiv = document.createElement("div");
  scrollDiv.style.visibility = "hidden";
  scrollDiv.style.overflow = "scroll";
  scrollDiv.style.position = "absolute";
  scrollDiv.style.top = "-9999px";
  scrollDiv.style.width = "100px";
  document.body.appendChild(scrollDiv);

  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);

  return scrollbarWidth;
};

const useBodyScrollLock = (isLocked) => {
  useLayoutEffect(() => {
    if (isLocked) {
      const scrollBarWidth = getScrollbarWidth();
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isLocked]);
};

export default useBodyScrollLock;
