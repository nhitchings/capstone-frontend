import { useCallback } from "react";

const useSmoothScroll = (offset = 100) => {
  const handleScrollTo = useCallback((anchor) => {
    return () => {
      const id = `${anchor}-section`;
      const element = document.getElementById(id);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    };
  }, [offset]);

  return handleScrollTo;
};

export default useSmoothScroll;