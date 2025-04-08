"use client";

import { useDraggable } from "@/lib/hooks";
import { Direction } from "re-resizable/lib/resizer";
import { Minus, Square, X } from "lucide-react";
import { Resizable } from "re-resizable";
import { useEffect, useState } from "react";
import { useDesktop } from "@/components/ui/desktop";
import Image from "next/image";
import { steps } from "motion";

export const App = (
  { appInfo, children, className, set }: 
  { appInfo: {icon: string,appName: string, status: "open" | "hidden" | "close", id: string},
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
      desktop.addApp(appInfo.icon,appInfo.appName, appInfo.status, appInfo.id);
    }, [desktop, appInfo.id, appInfo.appName, appInfo.status]);


    const openApp = () => handleAppStatus("open")
    const closeApp = () => handleAppStatus("close")
    const hideApp = () => handleAppStatus("hidden")
    return (
      <div>
        <div onClick={openApp} style={{ cursor: "pointer" }}>
          <Image alt={appInfo.appName} width={"50"} height={"50"} src={appInfo.icon} />
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
      appInfo: { icon: string,appName: string, status: "open" | "hidden" | "close", id: string},
      children: React.ReactNode, className?: string,
      set?: { width?: string, height?: string, position?: { x: number, y: number } }
      hideApp: () => void,
      closeApp: () => void,
    }
) => {
  const { activator, isDragging, draggableRef, style, setWidth, setHeight, position, setPosition } = useDraggable(
    {data: {
      pos: set?.position !== undefined ? set.position : undefined,
      size: {
        height: set?.height !== undefined ? set.height : undefined,
        width: set?.width !== undefined ? set.width : undefined,
      }
    }}
  );
  const desktop = useDesktop();
  const [lastInfo, setLastInfo] = useState<{pos : {x: number, y: number}, sizes: {width: string, height: string}}>
  ({pos : {x: 0, y: 0}, sizes : {width: "", height: ""}});

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

  const handleMaxSize = () => {
    if(draggableRef !== undefined && draggableRef.current !== null){
      let w = draggableRef.current.getBoundingClientRect().width + "px";
      let h = draggableRef.current.getBoundingClientRect().height + "px";

      setLastInfo({pos: position, sizes: {width: w, height: h}});
    }else{
      setLastInfo({pos: position, sizes: {width: "100%", height: "100%"}});
    }
    setPosition({x: 0, y: 0});
    setWidth("99.9vw")
    setHeight((window.innerHeight-1) + "px");
  }

  const handleLessSize = () => {
    setHeight(lastInfo.sizes.height)
    setWidth(lastInfo.sizes.width)
    setPosition(lastInfo.pos)
  }

  const isMax = (style.width == "99.9vw" && style.height == (window.innerHeight-1) + "px")
    ?
      true
    :
     false;

  "calc(" + style.height + "+1px)"
  return (
  <div
    key={"appSim" + appInfo.id}
    ref={draggableRef}
    onLoad={() => {desktop.activeApp(appInfo.id)}}
    style={{ ...style, zIndex: desktop.getZindex(appInfo.id) }}
    className={` ${className === undefined ? "rounded border bg-black" : className} ${desktop.getAppStatus(appInfo.id) !== "open" ? "hidden" : ""}`}
    onMouseDown={() => { desktop.activeApp(appInfo.id)}}
>
    <Resizable
      size={{ height: style.height}}
      onResize={handleResize}
      className="overflow-hidden relative"
    >
      <div
        ref={activator}
        className={`p-2 rounded-t bg-gray-600 flex justify-between ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        <span>{appInfo.appName}</span>
        <span className="flex gap-2">
          <Minus className="cursor-pointer" onClick={hideApp}/>
          <Square className="cursor-pointer" onClick={() => {
            if(isMax) {
              handleLessSize()
            }else{
              handleMaxSize()
            }
          }}/>
          <X className="cursor-pointer" onClick={closeApp}/>
        </span>
      </div>
      {children}
    </Resizable>
  </div>)
}