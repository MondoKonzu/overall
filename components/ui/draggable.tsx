"use client"

import { useState } from "react"

const Draggable = ({children} : {children? : React.ReactNode}) => {
    const [styles, setStyles] = useState({});
    const [grab, setGrab] = useState(false);
    const handleStartGrab = () => {
        setGrab(true);
    }
    const handleEndGrab = (e : any) => {
        setGrab(false);
        setStyles( {left: (e.clientX - (e.target.clientWidth/2))+"px",
            top: (e.clientY - (e.target.clientHeight/2))+"px"})
    }

    const handleMove = (e : any) => {
        if(grab){
            setStyles( {left: (e.clientX - (e.target.clientWidth/2))+"px",
                top: (e.clientY - (e.target.clientHeight/2))+"px"})
        }
    }

    return (
        <div
        >
            <div 
            draggable
            style={styles}
            onMouseDown={handleStartGrab}
            onDrag={handleMove}
            onDragEnd={handleEndGrab}
            className={`${grab ? "cursor-grabbing" : "hover:cursor-grab"} select-none absolute`}
            >
                yomo
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Draggable;