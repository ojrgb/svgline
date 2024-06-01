import React from 'react'
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface DraggableProps {
    children: React.ReactNode;
}

const Draggable: React.FC<DraggableProps> = ({ children }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'draggable',
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        cursor: 'grab',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
};

export default Draggable;