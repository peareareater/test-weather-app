import React, { FC, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { SearchResultItem } from './SearchResultItem';
import { SearchResult } from '../types';

type Item = {
    type: string;
    name: string;
    index: number;
};

interface LocationDraggableProps {
    removeFromFavourites: (name: string) => void;
    index: number;
    moveCard: (indexes: number[]) => void;
    searchResult: SearchResult;
}

export const FavouriteItem: FC<LocationDraggableProps> = ({ moveCard, removeFromFavourites, index, searchResult }) => {
    const ref = React.useRef(null);
    const [indexes, setIndexes] = useState([]);
    const [{ isDragging }, drag] = useDrag({
        item: { type: 'item', index, name: searchResult.name },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'item',
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),
        drop: () => moveCard(indexes),
        hover: (item: Item, monitor) => {
            if (!ref) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            setIndexes([dragIndex, hoverIndex]);
        },
    });
    drag(drop(ref));
    return (
        <div ref={ref} className={`content-wrapper ${isDragging ? 'dragged' : ''}`}>
            <SearchResultItem searchResult={searchResult} removeFromFavourites={removeFromFavourites} />
        </div>
    );
};
