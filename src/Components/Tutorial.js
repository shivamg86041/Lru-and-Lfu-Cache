import React from 'react';
import './Tutorial.css';
import lruDiagram from "../Assets/Working-of-LRU-Cache-(1).png";
import lfuDiagram from "../Assets/lfu.webp";

const Tutorial = ({ onNext }) => {
    return (
        <div className="tutorial-container">
            <h1>Welcome to the Cache Visualization Tutorial</h1>
            
            <section className="tutorial-section">
                <h2>What is LRU Caching?</h2>
                <p>
                    LRU (Least Recently Used) caching is an algorithm that removes the least recently accessed items first. This technique is useful in scenarios where the most recently accessed items are likely to be accessed again soon.
                </p>
                <h3>How It Works:</h3>
                <ul>
                    <li>Items are stored in the cache based on access time.</li>
                    <li>When the cache is full, the item that hasn't been accessed for the longest time is removed.</li>
                    <li>Newly accessed or added items are placed at the top of the cache stack.</li>
                </ul>
                <img src={lruDiagram} alt="LRU Diagram" className="diagram" />
            </section>

            <section className="tutorial-section">
                <h2>What is LFU Caching?</h2>
                <p>
                    LFU (Least Frequently Used) caching is an algorithm that removes items based on usage frequency. Items that are accessed less often are removed first, which is beneficial when frequently accessed items are expected to be used again.
                </p>
                <h3>How It Works:</h3>
                <ul>
                    <li>Each item has a counter tracking its access frequency.</li>
                    <li>When the cache is full, the item with the lowest access count is removed.</li>
                    <li>If multiple items have the same frequency, the oldest item is removed first.</li>
                </ul>
                <img src={lfuDiagram} alt="LFU Diagram" className="diagram" />
            </section>

            <section className="tutorial-section">
                <h2>Key Differences</h2>
                <p>
                    While both LRU and LFU help manage cache by removing less useful data, they differ in their approach: 
                    <strong>LRU</strong> focuses on recency of access, while <strong>LFU</strong> focuses on frequency of access.
                </p>
            </section>

            <div className="tutorial-navigation">
                <button className="next-button" onClick={onNext}>Next: Try It Yourself</button>
            </div>
        </div>
    );
};

export default Tutorial;
