"use client";

import { useDraggable } from "@/lib/hooks";
import { Direction } from "re-resizable/lib/resizer";
import { Minus, Square, X } from "lucide-react";
import { Resizable } from "re-resizable";
import { useEffect, useState } from "react";
import { useDesktop } from "@/components/ui/desktop";
import { random } from "lodash";

export const App = (
  { appInfo, children, className, set }: 
  { appInfo: {appName: string, status: "open" | "hidden" | "close", id: string},
    children: React.ReactNode, className?: string, 
    set?: { width?: string, height?: string, position?: { x: number, y: number } }
  }) => {
    const desktop = useDesktop();
    // Use appInfo.status as initial state to keep in sync with context
    const [status, setStatus] = useState<"open" | "hidden" | "close">(appInfo.status);

    const handleAppStatus = (newStatus: "open" | "hidden" | "close") => {
      if(desktop){
        desktop.updateAppStatus(appInfo.id, newStatus);
      }
      setStatus(newStatus);
    }
    
    useEffect(() => {
      if (!desktop) return;
      desktop.addApp(appInfo.appName, appInfo.status, appInfo.id);
    }, [desktop, appInfo.id, appInfo.appName, appInfo.status]);


    const openApp = () => handleAppStatus("open")
    const closeApp = () => handleAppStatus("close")
    const hideApp = () => handleAppStatus("hidden")
    return (
      <div>
        <div onClick={openApp} style={{ cursor: "pointer" }}>
          bobby
        </div>
        {(status === "open" || status === "hidden") && (
          <AppSim 
            key={appInfo.id} 
            appInfo={{...appInfo, status}} 
            className={className}
            set={set}
            closeApp={closeApp}
            hideApp={hideApp}
          >
            {children}
          </AppSim>
        )}
      </div>
    );
};

const AppSim = (
  { appInfo, children, className, set, hideApp, closeApp }:
    {
      appInfo: { appName: string, status: "open" | "hidden" | "close", id: string},
      children: React.ReactNode, className?: string,
      set?: { width?: string, height?: string, position?: { x: number, y: number } }
      hideApp: () => void,
      closeApp: () => void,
    }
) => {
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
    key={"appSim" + appInfo.id}
    ref={draggableRef}
    onLoad={() => {desktop.activeApp(appInfo.id)}}
    style={{ ...style, zIndex: desktop.getZindex(appInfo.id) }}
    className={` ${className === undefined ? "rounded border bg-black" : className} ${appInfo.status !== "open" ? "hidden" : ""}`}
    onMouseDown={() => { desktop.activeApp(appInfo.id)}}
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
        <span>{appInfo.appName}</span>
        <span className="flex">
          <Minus onClick={hideApp}/>
          <Square />
          <X onClick={closeApp}/>
        </span>
      </div>
      {children}
    </Resizable>
  </div>)
}