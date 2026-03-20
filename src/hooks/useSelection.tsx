import React from "react";

export function useSelection<T>() {
    const [selected, setSelected] = React.useState<T | null>(null);
    const [isOpen, setIsOpen] = React.useState(false);

    const onSelection = (item: T) => {
        setSelected(item);
        setIsOpen(true);
    }

    const onClose = () => {
        setIsOpen(false);
        setSelected(null);
    }

    return {
        selected,
        isOpen,
        onSelection,
        onClose
    }
}