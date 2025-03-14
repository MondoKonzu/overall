"use client";

import { useDraggable } from "@/lib/hooks";
import { Direction } from "re-resizable/lib/resizer";
import { Minus, Square, X } from "lucide-react";
import { Resizable } from "re-resizable";
import { useEffect } from "react";

const ApplicationSim = (
  {appName, children, className, set}
   : 
  {appName: string, children: React.ReactNode, className?: string, 
    set? : {width?: string, height?: string, position?: {x: number, y:number}}
  }) => {
  const { activator, isDragging, draggableRef, style, setWidth, setHeight, position, setPosition } = useDraggable();

  useEffect(() => {

    if(set !== undefined){
      if(set.position !== undefined){
        setPosition(position);
      }
      if(set.height !== undefined) setHeight(set.height);
      if(set.width !== undefined) setWidth(set.width);
    }
  }, [])

  const handleResize = (e: MouseEvent | TouchEvent, dir: Direction, ref: HTMLElement) => {
    if (ref.style.width !== "auto") {
      setWidth(ref.style.width);
    }

    setHeight(ref.style.height);
    if (dir.toLowerCase().includes("left") && e instanceof MouseEvent) {
      setPosition({ x: e.screenX, y: position.y });
    }
    if (dir.toLowerCase().includes("top") && e instanceof MouseEvent) {
      setPosition({ x: position.x, y: e.screenY })
    }
    if(dir == "topLeft" && e instanceof MouseEvent){
      setPosition({ x: e.screenX, y: e.screenY })

    }
    
  }


  return (
    <div
      ref={draggableRef}
      style={style}
      className="rounded border bg-black"
    >
      <Resizable
        size={{ height: style.height }}
        onResize={handleResize}
        className="overflow-hidden"
      >
        <div
          ref={activator}
          className={`p-2 rounded-t bg-gray-600 flex justify-between ${isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
        >
          <span>Appname</span> <span className="flex"> <Minus /><Square /><X /></span>
        </div>
            {children}
      </Resizable>
    </div>
  );
};

export default ApplicationSim;