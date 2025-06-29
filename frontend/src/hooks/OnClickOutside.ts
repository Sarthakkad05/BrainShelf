// blackbox
import { useEffect } from "react";

/**
 * Calls `handler` when a click occurs outside the given `ref` element.
 * @param {React.RefObject} ref - The ref of the element to detect outside clicks for.
 * @param {Function} handler - The function to run on outside click.
 */
export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking inside the ref element or its children
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event); // Run the handler if click is outside
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Clean up on unmount
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
