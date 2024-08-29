import React, { useState } from 'react';
import './CacheDisplay.css';

const CacheDisplay = ({ cache = [], title, highlightItem, viewMode }) => {
    const [isStackView, setIsStackView] = useState(viewMode === 'stack');

    const handleToggleView = () => {
        setIsStackView(!isStackView);
    };

    return (
        <div className="cache-display">
            <h2>{title}</h2>
            <button className="toggle-view-button" onClick={handleToggleView}>
                {isStackView ? 'Switch to Block View' : 'Switch to Stack View'}
            </button>
            <div className={isStackView ? 'stack-view' : 'block-view'}>
                {(Array.isArray(cache) ? cache : []).map(([key, value], index) => (
                    <div
                        key={index}
                        className={`cache-item ${highlightItem?.key === key ? 'highlight' : ''}`}
                    >
                        <span className="cache-key">{key}</span>
                        <span className="cache-value">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CacheDisplay;
