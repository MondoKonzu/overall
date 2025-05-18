"use client";

import { useDraggable } from "@/lib/hooks";
import { Direction } from "re-resizable/lib/resizer";
import { Minus, Square, X } from "lucide-react";
import { Resizable } from "re-resizable";
import { useEffect, useRef, useState } from "react";
import { useDesktop } from "@/components/ui/desktop";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./scroll-area";

export const App = (
  { appInfo, children, className, set }: 
  { appInfo: {icon: string,appName: string, status: "open" | "hidden" | "close", id: string},
    children: React.ReactNode, className?: string, 
    set?: { width?: string, height?: string, position?: { x: number, y: number } }
  }) => {
    //recovering useful vars
    const desktop = useDesktop();
    // Use appInfo.status as initial state to keep in sync with context
    const [status, setStatus] = useState<"open" | "hidden" | "close">(appInfo.status);

    // update the status both for the app and the context
    const handleAppStatus = (newStatus: "open" | "hidden" | "close") => {
      if(desktop){
        desktop.updateAppStatus(appInfo.id, newStatus);
      }
      setStatus(newStatus);
    }
    
    // adding the app in the context
    useEffect(() => {
      if (!desktop) return;
      desktop.addApp(appInfo.icon,appInfo.appName, appInfo.status, appInfo.id);
    }, [desktop, appInfo.id, appInfo.appName, appInfo.status]);


    //just to make it easier to use handleAppStatus
    const openApp = () => handleAppStatus("open")
    const closeApp = () => handleAppStatus("close")
    const hideApp = () => handleAppStatus("hidden")
    return (
      <div>

        {/* Icon */}
        <div onClick={openApp} style={{ cursor: "pointer" }}>
          <Image className="min-w-12" alt={appInfo.appName} width={"50"} height={"50"} src={appInfo.icon} />
        </div>
        
        {/* Main app */}
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
  //the whole trash above is just the wrong way to get vars

  const desktop = useDesktop();
  const [innerHeight, setInnerHeight] = useState<string | number>("100%");
  const body = useRef(null);

  useEffect(()=>{
    setTimeout(setInHeight, 1)
  }, [body])

  const [lastInfo, setLastInfo] = useState<{pos : {x: number, y: number}, sizes: {width: string, height: string}}>
  ({pos : {x: 0, y: 0}, sizes : {width: "", height: ""}});

  const setInHeight = () => {
    console.log("inner" + innerHeight)
    console.log(draggableRef.current?.clientHeight)
    setInnerHeight(draggableRef.current != undefined && activator.current != undefined ?
      (draggableRef.current?.getBoundingClientRect().height! - activator.current?.getBoundingClientRect().height!)
      :
      "100%");
  }

  const handleResize = (e: MouseEvent | TouchEvent, dir: Direction, ref: HTMLElement) => {
    setInHeight();
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
    setTimeout(setInHeight, 1)
  }

  const handleLessSize = () => {
    setHeight(lastInfo.sizes.height)
    setWidth(lastInfo.sizes.width)
    setPosition(lastInfo.pos)
    setTimeout(setInHeight, 1)
  }

  const isMax = (style.width == "99.9vw" && style.height == (window.innerHeight-1) + "px")
    ?
      true
    :
     false;

  "calc(" + style.height + "+1px)"
  return (
    // the whole body
    <div
    key={"appSim" + appInfo.id}
    ref={draggableRef}
    onLoad={() => {desktop.activeApp(appInfo.id)}}
    style={{ ...style, zIndex: desktop.getZindex(appInfo.id) }}
    className={` ${cn("rounded bg-black", className)} ${isMax ? "" : "cut-edge-app"} ${desktop.getAppStatus(appInfo.id) !== "open" ? "hidden" : ""}`}
    onMouseDown={() => { desktop.activeApp(appInfo.id)}}
>
  {/* resizer */}
    <Resizable
      size={{ height: style.height}}
      onResize={handleResize}
      className="overflow-hidden relative"
    >
      {/* Activator of the drag event */}
      <div
        ref={activator}
        className={`${isMax ? "" : "cut-edge-tl"} ps-10 p-2 rounded-t bg-gray-600 flex justify-between ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
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
      {/* body */}
      <ScrollArea ref={body} style={{height: innerHeight}} >
        {children}
      </ScrollArea>
    </Resizable>
  </div>)
}