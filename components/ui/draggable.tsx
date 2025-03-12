"use client";

import { useDraggable } from "@/lib/hooks";
import { Minus, Square, X } from "lucide-react";
import { Resizable } from "re-resizable";
import { useState, useEffect, act } from "react";

const ApplicationSim = () => {
  const {activator, isDragging, draggableRef, style, setWidth,setHeight} = useDraggable();
  return (
    <div
      ref={draggableRef}
      style={style}
      className="rounded border"
    >
      <div
          ref={activator}
          className={`p-2 rounded-t bg-gray-600 flex place-content-end ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <Minus /><Square /><X/>
      </div>
      <Resizable 
      onResize={(e, dir, ref) => {
        if(ref.style.width != "auto"){
          setWidth(ref.style.width)
        }
        setHeight((parseFloat(ref.style.height)+ (activator.current != null ? activator.current.clientHeight : 0))as unknown as string);
        }}
        className="overflow-hidden">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis dicta autem molestiae modi consequatur, facere soluta fugit temporibus, numquam quam aliquam pariatur aut ipsum aliquid eveniet nostrum accusantium, maiores earum.
      </Resizable>
    </div>
  );
};

export default ApplicationSim;
