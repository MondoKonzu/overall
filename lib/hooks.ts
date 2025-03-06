import { isAbsolute } from "path";
import { RefObject, useEffect, useRef, useState } from "react";

/**
 * 
 * @returns an object with   
 * style: to applay to the element which shold move
 * activator: to use as ref of the element that should activate and handle the grab
 * isDragging: in case you need to perform actions during handling
 * position: in case you need to know where it is in the page
 */
export function useDraggable() {
  const activator = useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [baseDatas, setBaseDatas] = useState({isAbsolute: false, bWidth: ""});
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: MouseEvent) => {
    if (!activator.current) return;

    // Get the initial position of the element with respect to the window
    const rect = activator.current.getBoundingClientRect();

    // Calculates the offset between the mouse and the upper left corner of the element
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    // Calculates the new position relative to the container
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  //when the element is grabbed listener is applied to the whole document
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  //when the ref is attached to the element add every needed option
  useEffect(() => {
    
    if (activator.current) {
      activator.current.addEventListener("mousedown", (e) =>
        handleMouseDown(e as unknown as MouseEvent)
      );
        setPosition({x: activator.current.getBoundingClientRect().left,
             y: activator.current.getBoundingClientRect().top});
        setBaseDatas({isAbsolute: true, bWidth: activator.current.getBoundingClientRect().width + "px"}); 
    }

    return () => {
      if (activator.current) {
        activator.current.removeEventListener("mousedown", (e) =>
          handleMouseDown(e as unknown as MouseEvent)
        );
        setPosition({x: activator.current.getBoundingClientRect().left,
            y: activator.current.getBoundingClientRect().top});
        setBaseDatas({isAbsolute: true, bWidth: activator.current.getBoundingClientRect().width + "px"}); 
      }
    };
  }, [activator]);

  //styles afflict position and the main type of position
  const style = {
    position: `${baseDatas.isAbsolute ? "absolute" : "static"}`,
    left: position.x,
    top: position.y,
    userSelect: "none",
    maxWidth: baseDatas.bWidth,
  };

  //return data needed or useful while creating a draggable component
  return { style, activator, isDragging, position } as {
    style: {};
    activator: RefObject<HTMLDivElement | null>;
    isDragging: boolean;
    position: { x: number; y: number };
  };
}
