import React from 'react';
import './ControlPanel.css'; // Include specific styles for the control panel

const ControlPanel = ({ keyValue, value, onKeyChange, onValueChange, onAdd, onGet }) => (
    <div className="control-panel">
        <input
            type="text"
            placeholder="Key"
            value={keyValue}
            onChange={onKeyChange}
        />
        <input
            type="text"
            placeholder="Value"
            value={value}
            onChange={onValueChange}
        />
        <button onClick={() => onAdd('LRU')}>Add to LRU</button>
        <button onClick={() => onAdd('LFU')}>Add to LFU</button>
        <button onClick={() => onGet('LRU')}>Get from LRU</button>
        <button onClick={() => onGet('LFU')}>Get from LFU</button>
    </div>
);

export default ControlPanel;
