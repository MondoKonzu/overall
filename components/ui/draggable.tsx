"use client";

import { useState, useEffect } from "react";

const Draggable = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    // Aggiungi i listener globali
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      // Rimuovi i listener quando non stai trascinando
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    // Cleanup dei listener quando il componente viene smontato
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]); // Effettua il controllo quando `isDragging` cambia

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        userSelect: "none",
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        className={`min-w-32 min-h-16 bg-red-600 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        Drag me
      </div>
      <div>
        fjsdfshbjlkgdfhlsj
      </div>
    </div>
  );
};

export default Draggable;
