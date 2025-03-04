"use client";

import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

const DragArea = () => {
  // Initialize position state
  const {setNodeRef} = useDroppable({id: 1});

  return (
    <div
      ref={setNodeRef}
      className="min-h-[50vh] max-w-full min-w-full bg-violet-950 overflow-x-hidden overflow-y-auto grid grid-cols-3 gap-4 p-4"
    >
      <DndContext>
        <Draggable/>
        <Droppable />
      </DndContext>
    </div>
  );
};

export default DragArea;

function Droppable() {
  const {isOver, setNodeRef} = useDroppable({
    id: 1,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      drop
    </div>
  );
}

function Draggable() {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 2,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      drag
    </button>
  );
}