import { RefObject, useEffect, useRef, useState } from "react";

export function useDraggable() {
  const activator = useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [baseDatas, setBaseDatas] = useState({ isAbsolute: false, width: "" });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: MouseEvent) => {
    if (!activator.current) return;

    const rect = activator.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !activator.current) return;

    const rect = activator.current.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width -2;
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
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

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

  useEffect(() => {
    if (activator.current) {
      activator.current.addEventListener("mousedown", (e) =>
        handleMouseDown(e as unknown as MouseEvent)
      );
      setPosition({
        x: activator.current.getBoundingClientRect().left,
        y: activator.current.getBoundingClientRect().top,
      });
      setBaseDatas({
        isAbsolute: true,
        width: activator.current.getBoundingClientRect().width + "px",
      });
    }

    return () => {
      if (activator.current) {
        activator.current.removeEventListener("mousedown", (e) =>
          handleMouseDown(e as unknown as MouseEvent)
        );
      }
    };
  }, [activator]);

  const style = {
    position: `${baseDatas.isAbsolute ? "absolute" : "static"}`,
    left: position.x,
    top: position.y,
    userSelect: "none",
    width: baseDatas.width,
  };

  const setWidth = (valueWithUnit: string) => {
    setBaseDatas((prev) => ({ ...prev, width: valueWithUnit }));
  };

  return { style, activator, isDragging, position, setWidth } as {
    style: {};
    activator: RefObject<HTMLDivElement | null>;
    isDragging: boolean;
    position: { x: number; y: number };
    setWidth: (value: string) => void;
  };
}