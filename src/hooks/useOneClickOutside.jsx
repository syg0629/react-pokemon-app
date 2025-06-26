import { useEffect } from "react";

export const useOneClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // 모달 안을 클릭했을 때
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // 모달 밖을 클릭했을 때
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
