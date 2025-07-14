'use client'
import React, { useState } from "react";

interface AccordionItem {
    title: string;
    content: string;
}

interface AccordionProps {
    items: AccordionItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [focusedIndex, setFocusedIndex] = useState<number>(0);

    const handleToggle = (index: number) => {
        setActiveIndex(prev => (prev === index ? null : index));
    };

    const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setFocusedIndex((index + 1) % items.length);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setFocusedIndex((index - 1 + items.length) % items.length);
        } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleToggle(index);
        }
    };

    return (
        <div role="presentation">
            {items.map((item, index) => (
                <div key={index}>
                    <div
                        tabIndex={0}
                        role="button"
                        aria-expanded={activeIndex === index}
                        aria-controls={`accordion-panel-${index}`}
                        onClick={() => handleToggle(index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        style={{
                            padding: "8px",
                            background: activeIndex === index ? "#eee" : "#ccc",
                            cursor: "pointer",
                            outline: focusedIndex === index ? "2px solid blue" : "none"
                        }}
                    >
                        {item.title}
                    </div>
                    {activeIndex === index && (
                        <div
                            id={`accordion-panel-${index}`}
                            role="region"
                            aria-labelledby={`accordion-header-${index}`}
                            style={{ padding: "8px", border: "1px solid #ddd" }}
                        >
                            {item.content}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
