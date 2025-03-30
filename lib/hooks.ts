import { RefObject, useEffect, useRef, useState, useCallback, useMemo } from "react";

type Props = {
  data?: {
    pos?:{
      x: number;
      y: number;
    },
    size?: {
      width?: string,
      height?: string
    }
  }
}

export function useDraggable(props? : Props) {
  const activator = useRef<HTMLDivElement | null>(null); // Element that triggers the drag activator
  const draggableRef = useRef<HTMLDivElement | null>(null); // Element that moves draggaableRef

  /**
   * Keep the position of the element that move,
   * x = left in px, y = top in px
   */
  const [position, setPosition] = useState({ x: 0, y: 0 });
  /**
   * Data to deal for rendering on position : absolute, those data will affect 
   * the width and height of the element that move
   */
  const [baseDatas, setBaseDatas] = useState({ isAbsolute: false, width: "", height: "" });
  /**
   * Just a state to deal with the drag status, help to deal with style changes
   */
  const [isDragging, setIsDragging] = useState(false);
  /**
   * keep the value of the offset which indicate the position the mouse
   * is going to be on the element that move
   */
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Handle mouse down on the activator
  const handleMouseDown = useCallback((e: MouseEvent) => {
    // ONLY when both activator and draggable are in the DOM
    // and linked to an element
    if (!activator.current || !draggableRef.current) return;

    //get the info of the whole draggable element
    const rect = draggableRef.current.getBoundingClientRect();
    // setting the offset mousePosition - elementPosition
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    //the drag event begin
    setIsDragging(true);
  }, []);

  // Handle mouse move for dragging
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !draggableRef.current) return;

    /* vars to check that the dragged element is still in the window */
    const rect = draggableRef.current.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;

    //the actual position of the element
    let newX = e.clientX - offset.x;
    let newY = e.clientY - offset.y;

    // Ensure the element stays within the viewport boundaries
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    //setting the position if possible 
    setPosition({
      x: newX,
      y: newY,
    });
  }, [isDragging, offset.x, offset.y]);

  // Handle mouse up to stop dragging
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add and remove event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Set up the activator element
  useEffect(() => {
    const currentActivator = activator.current;
    if (currentActivator) {
      const handleMouseDownWrapper = (e: Event) => handleMouseDown(e as MouseEvent);
      currentActivator.addEventListener("mousedown", handleMouseDownWrapper);

      return () => {
        currentActivator.removeEventListener("mousedown", handleMouseDownWrapper);
      };
    }
  }, [handleMouseDown]);

  // Set initial position and dimensions of the draggable element
  useEffect(() => {
    if (draggableRef.current) {
      const rect = draggableRef.current.getBoundingClientRect();
      if(props != undefined && props.data !== undefined && props.data.pos !== undefined){
        setPosition({x: props.data.pos.x, y: props.data.pos.y});
      }else{
        setPosition({ x: rect.left, y: rect.top });
      }
      setBaseDatas({
        isAbsolute: true,
        width: props?.data?.size?.width !== undefined ? props.data.size.width! : rect.width + "px",
        height: props?.data?.size?.width !== undefined ? props.data.size.height! : rect.height + "px",
      });
    }
  }, [draggableRef.current]);

  // Memoized style object for the draggable element
  const style = useMemo(() => ({
    position: baseDatas.isAbsolute ? "absolute" : "static",
    left: position.x,
    top: position.y,
    userSelect: "none",
    width: baseDatas.width,
    height: baseDatas.height,
  }), [baseDatas.isAbsolute, baseDatas.width, baseDatas.height, position.x, position.y]);

  // Function to set the width of the draggable element
  const setWidth = useCallback((valueWithUnit: string) => {
    setBaseDatas((prev) => ({ ...prev, width: valueWithUnit }));
  }, []);

    // Function to set the width of the draggable element
    const setHeight = useCallback((valueHeightUnit: string) => {
      setBaseDatas((prev) => ({ ...prev, height: valueHeightUnit }));
    }, []);

  return {
  style,//move the element
  activator,//the element to drag for moving the element
  draggableRef,//the element to move
  isDragging,// true when the element is on drag else false
  position,//position of the element x = left , y = top
  setWidth,// a fn to change the element width on need
  setHeight,// a fn to change the element height on need
  setPosition, // Add this line
} as {
  style: React.CSSProperties;
  activator: RefObject<HTMLDivElement | null>;
  draggableRef: RefObject<HTMLDivElement | null>;
  isDragging: boolean;
  position: { x: number; y: number };
  setWidth: (value: string) => void;
  setHeight: (value: string) => void;
  setPosition: (value: { x: number; y: number }) => void;
};
}