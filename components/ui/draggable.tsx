"use client";

import { useDraggable } from "@/lib/hooks";
import { useState, useEffect, act } from "react";

const Draggable = () => {
  const {activator, isDragging, style} = useDraggable();

  return (
    <div
      style={style}
    >
      <div
          ref={activator}
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
