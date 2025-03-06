import { act, RefObject, useEffect, useRef, useState } from "react";

export function useDraggable() {
  const activator = useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isAbsolute, setIsAbsolute] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: MouseEvent) => {
    if (!activator.current) return;

    // Ottieni la posizione iniziale dell'elemento rispetto alla finestra
    const rect = activator.current.getBoundingClientRect();

    // Calcola l'offset tra il mouse e l'angolo superiore sinistro dell'elemento
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    // Calcola la nuova posizione relativa al contenitore
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
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
        setPosition({x: activator.current.getBoundingClientRect().left,
             y: activator.current.getBoundingClientRect().top});
        setIsAbsolute(true);      
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
    position: `${isAbsolute ? "absolute" : ""}`,
    left: position.x,
    top: position.y,
    userSelect: "none",
    maxWidth: "fit-content",
  };

  return { style, activator, isDragging, position } as {
    style: {};
    activator: RefObject<HTMLDivElement | null>;
    isDragging: boolean;
    position: { x: number; y: number };
  };
}
