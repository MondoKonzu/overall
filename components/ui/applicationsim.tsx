"use client";

import { useDraggable } from "@/lib/hooks";
import { Direction } from "re-resizable/lib/resizer";
import { Minus, Square, X } from "lucide-react";
import { NumberSize, Resizable } from "re-resizable";
import { useEffect, useState } from "react";

const ApplicationSim = () => {
  const { activator, isDragging, draggableRef, style, setWidth, setHeight, position, setPosition } = useDraggable();


  const handleResize = (e: MouseEvent | TouchEvent, dir: Direction, ref: HTMLElement) => {
    if (ref.style.width !== "auto") {
      setWidth(ref.style.width);
    }

    setHeight(ref.style.height);
    if (dir.includes("left") && e instanceof MouseEvent) {
      setPosition({ x: e.screenX, y: position.y });
    }
    if (dir.includes("top") && e instanceof MouseEvent) {
      setPosition({ x: position.x, y: e.screenY })
    }
  }


  return (
    <div
      ref={draggableRef}
      style={style}
      className="rounded border"
    >
      <Resizable
        size={{ height: style.height }}
        onResize={handleResize}
        bounds={"window"}
        className="overflow-hidden"
      >
        <div
          ref={activator}
          className={`p-2 rounded-t bg-gray-600 flex justify-between ${isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
        >
          <span>Appname</span> <span className="flex"> <Minus /><Square /><X /></span>
        </div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis dicta autem molestiae modi consequatur, facere soluta fugit temporibus, numquam quam aliquam pariatur aut ipsum aliquid eveniet nostrum accusantium, maiores earum.
      </Resizable>
    </div>
  );
};

export default ApplicationSim;