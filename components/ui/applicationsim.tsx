"use client";

import { useDraggable } from "@/lib/hooks";
import { Direction } from "re-resizable/lib/resizer";
import { Minus, Square, X } from "lucide-react";
import { Resizable } from "re-resizable";
import { useEffect } from "react";
import { useDesktop } from "@/components/ui/desktop";
import { random } from "lodash";

export const App = (
  { icon, appInfo, children, className, set }: 
  { icon? : string,
    appInfo: {appName: string, status: "open" | "hidden" | "close", id: string | number},
    children: React.ReactNode, className?: string, 
    set?: { width?: string, height?: string, position?: { x: number, y: number } }
  }
) => {
  return (
    <div>
      <div>dsa</div>
      <ApplicationSim appInfo={appInfo} set={set} className={className}>
        {children}
      </ApplicationSim>
    </div>
  )

}

const ApplicationSim = (
  { appInfo, children, className, set }: 
  { appInfo: {appName: string, status: "open" | "hidden" | "close", id: string | number},
    children: React.ReactNode, className?: string, 
    set?: { width?: string, height?: string, position?: { x: number, y: number } }
  }) => {
  const { activator, isDragging, draggableRef, style, setWidth, setHeight, position, setPosition } = useDraggable();
  const desktop = useDesktop();

  useEffect(() => {
    if (set !== undefined) {
      if (set.position !== undefined) {
        setPosition(position);
      }
      if (set.height !== undefined) setHeight(set.height);
      if (set.width !== undefined) setWidth(set.width);
    }
  }, [set, setPosition, setHeight, setWidth, position]);

  useEffect(() => {
    if (desktop) {
      if(desktop.addApp(appInfo.appName, appInfo.status, appInfo.id) === undefined){
        let corr : number= random(100);
        appInfo.id = corr;
        desktop.addApp(appInfo.appName, appInfo.status, appInfo.id);
      }
    }
  }, []);

  const handleResize = (e: MouseEvent | TouchEvent, dir: Direction, ref: HTMLElement) => {
    if (ref.style.width !== "auto") {
      setWidth(ref.style.width);
    }
    setHeight(ref.style.height);
    if (dir.toLowerCase().includes("left") && e instanceof MouseEvent) {
      setPosition({ x: e.screenX, y: position.y });
    }
    if (dir.toLowerCase().includes("top") && e instanceof MouseEvent) {
      setPosition({ x: position.x, y: e.screenY });
    }
    if (dir === "topLeft" && e instanceof MouseEvent) {
      setPosition({ x: e.screenX, y: e.screenY });
    }
  };

  return (
    <div
      ref={draggableRef}
      style={{...style, zIndex: desktop.getZindex(appInfo.id)}}
      className={` ${className === undefined ? "rounded border bg-black" : className}`}
      onMouseDown={() => {desktop.activeApp(appInfo.id)}}
    >
      <Resizable
        size={{ height: style.height }}
        onResize={handleResize}
        className="overflow-hidden"
      >
        <div
          ref={activator}
          className={` p-2 rounded-t bg-gray-600 flex justify-between ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        >
          <span>{appInfo.appName}</span> <span className="flex"> <Minus /><Square /><X /></span>
        </div>
        {children}
      </Resizable>
    </div>
  );
};

