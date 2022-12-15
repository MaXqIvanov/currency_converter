import { useState, useEffect, useRef, MutableRefObject } from 'react';

const useClickOutSide = (handler: () => void) => {
  const domNode = useRef() as MutableRefObject<HTMLInputElement>;
  useEffect(() => {
    const maybeHandler = (event: { target: EventTarget | null }) => {
      const value = event.target as Node | null;
      if (!domNode.current.contains(value)) {
        handler();
      }
    };
    document.addEventListener('mousedown', maybeHandler);
    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  });
  return domNode;
};
export default useClickOutSide;
