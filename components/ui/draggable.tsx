"use client";

import { useDraggable } from "@/lib/hooks";
import { useState, useEffect, act } from "react";

const ApplicationSim = () => {
  const {activator, isDragging, draggableRef, style} = useDraggable();
  return (
    <div
      ref={draggableRef}
      style={style}
      className="rounded border"
    >
      <div
          ref={activator}
          className={`p-2 rounded-t bg-gray-600 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        Drag me here will be the bar
      </div>
      <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis dicta autem molestiae modi consequatur, facere soluta fugit temporibus, numquam quam aliquam pariatur aut ipsum aliquid eveniet nostrum accusantium, maiores earum.
      </div>
    </div>
  );
};

export default ApplicationSim;
