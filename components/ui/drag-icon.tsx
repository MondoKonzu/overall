"use client";

import { DndContext } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { useState, useCallback } from "react";

const DragArea = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6]);

  const handleDragEnd = useCallback((event : any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.indexOf(active.id);
        const newIndex = prevItems.indexOf(over.id);

        if (oldIndex === -1 || newIndex === -1) {
          return prevItems;
        }

        const newItems = [...prevItems];
        // Remove the active item and insert it in the new index
        newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, active.id);

        return newItems;
      });
    }
  }, []);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="min-h-[50vh] max-w-full min-w-full bg-violet-950 overflow-x-hidden overflow-y-auto
        grid grid-cols-3 gap-4 p-4">
          {items.map(item => (
            <SortableItem key={item} id={item}>
              {item}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default DragArea;

function SortableItem({ id, children } : {id: number, children: React.ReactNode}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="rounded-md bg-black/80" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
