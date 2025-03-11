import { RefObject, useEffect, useRef, useState, useCallback, useMemo } from "react";

export function useDraggable() {
  const activator = useRef<HTMLDivElement | null>(null); // Element that triggers the drag
  const draggableRef = useRef<HTMLDivElement | null>(null); // Element that moves

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [baseDatas, setBaseDatas] = useState({ isAbsolute: false, width: "", height: "" });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Handle mouse down on the activator
  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (!activator.current || !draggableRef.current) return;

    const rect = draggableRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    setIsDragging(true);
  }, []);

  // Handle mouse move for dragging
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !draggableRef.current) return;

    const rect = draggableRef.current.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;

    let newX = e.clientX - offset.x;
    let newY = e.clientY - offset.y;

    // Ensure the element stays within the viewport boundaries
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    setPosition({
      x: newX,
      y: newY,
    });
  }, [isDragging, offset.x, offset.y]);

  // Handle mouse up to stop dragging
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add and remove event listeners for dragging
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
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Set up the activator element
  useEffect(() => {
    const currentActivator = activator.current;
    if (currentActivator) {
      const handleMouseDownWrapper = (e: Event) => handleMouseDown(e as MouseEvent);
      currentActivator.addEventListener("mousedown", handleMouseDownWrapper);

      return () => {
        currentActivator.removeEventListener("mousedown", handleMouseDownWrapper);
      };
    }
  }, [handleMouseDown]);

  // Set initial position and dimensions of the draggable element
  useEffect(() => {
    if (draggableRef.current) {
      const rect = draggableRef.current.getBoundingClientRect();
      setPosition({ x: rect.left, y: rect.top });
      setBaseDatas({
        isAbsolute: true,
        width: rect.width + "px",
        height: rect.height + "px",
      });
    }
  }, [draggableRef.current]);

  // Memoized style object for the draggable element
  const style = useMemo(() => ({
    position: baseDatas.isAbsolute ? "absolute" : "static",
    left: position.x,
    top: position.y,
    userSelect: "none",
    width: baseDatas.width,
    height: baseDatas.height,
  }), [baseDatas.isAbsolute, baseDatas.width, baseDatas.height, position.x, position.y]);

  // Function to set the width of the draggable element
  const setWidth = useCallback((valueWithUnit: string) => {
    setBaseDatas((prev) => ({ ...prev, width: valueWithUnit }));
  }, []);

  return {
    style,
    activator,
    draggableRef,
    isDragging,
    position,
    setWidth,
  } as {
    style: React.CSSProperties;
    activator: RefObject<HTMLDivElement | null>;
    draggableRef: RefObject<HTMLDivElement | null>;
    isDragging: boolean;
    position: { x: number; y: number };
    setWidth: (value: string) => void;
  };
}