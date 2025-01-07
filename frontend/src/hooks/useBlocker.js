import { useContext, useEffect } from "react";
import { UNSAFE_NavigationContext } from "react-router-dom";

export const useBlocker = (blocker, when = true) => {
  const { navigator } = useContext(UNSAFE_NavigationContext);

  useEffect(() => {
    if (!when) return;

    const push = navigator.push;
    const replace = navigator.replace;

    const block = (...args) => {
      const proceed = blocker();
      if (proceed) {
        push(...args);
      }
    };

    navigator.push = block;
    navigator.replace = block;

    return () => {
      navigator.push = push;
      navigator.replace = replace;
    };
  }, [blocker, when, navigator]);
};
