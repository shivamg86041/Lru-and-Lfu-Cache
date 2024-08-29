import React, { useState } from 'react';
import { LRUCache, LFUCache } from './utils/caches.js';
import CacheDisplay from './Components/CacheDisplay';
import ControlPanel from './Components/ControlPanel';
import Tutorial from './Components/Tutorial';
import Quiz from './Components/Quiz';
import './App.css';

const App = () => {
    const [lruCache] = useState(new LRUCache(3));
    const [lfuCache] = useState(new LFUCache(3));
    const [section, setSection] = useState('tutorial');
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [lruCacheState, setLruCacheState] = useState([]);
    const [lfuCacheState, setLfuCacheState] = useState([]);
    const [accessData, setAccessData] = useState([]);
    const [highlight, setHighlight] = useState(null);
    const [quizAnswers, setQuizAnswers] = useState([]);
    const [viewMode, setViewMode] = useState('stack'); // 'stack' or 'block'

    const handleAdd = (cacheType) => {
        if (cacheType === 'LRU') {
            lruCache.put(key, value);
            setLruCacheState(lruCache.getCache());
        } else {
            lfuCache.put(key, value);
            setLfuCacheState(lfuCache.getCache());
        }
        setKey('');
        setValue('');
    };

    const handleGet = (cacheType) => {
        let result;
        if (cacheType === 'LRU') {
            result = lruCache.get(key);
            setLruCacheState(lruCache.getCache());
        } else {
            result = lfuCache.get(key);
            setLfuCacheState(lfuCache.getCache());
        }
        setHighlight({ key });
        setAccessData((prevData) => [...prevData, { key, result, cacheType }]);
        setKey('');
    };

    const goBack = () => {
        switch (section) {
            case 'example':
                setSection('tutorial');
                break;
            case 'quiz':
                setSection('example');
                break;
            default:
                break;
        }
    };

    return (
        <div className="App">
            <div className="navigation-buttons">
                {section !== 'tutorial' && (
                    <button className="navigation-button back-button" onClick={goBack}>Back</button>
                )}
                {section === 'example' && (
                    <button className="navigation-button next-button" onClick={() => setSection('quiz')}>Next: Quiz</button>
                )}
            </div>

            {section === 'tutorial' && (
                <Tutorial onNext={() => setSection('example')} />
            )}

            {section === 'example' && (
                <>
                    <ControlPanel
                        keyValue={key}
                        value={value}
                        onKeyChange={(e) => setKey(e.target.value)}
                        onValueChange={(e) => setValue(e.target.value)}
                        onAdd={(cacheType) => handleAdd(cacheType)}
                        onGet={(cacheType) => handleGet(cacheType)}
                    />
                    <div className="caches">
                        <CacheDisplay
                            cache={lruCacheState}
                            title="LRU Cache"
                            highlightItem={highlight}
                            viewMode={viewMode}
                        />
                        <CacheDisplay
                            cache={lfuCacheState}
                            title="LFU Cache"
                            highlightItem={highlight}
                            viewMode={viewMode}
                        />
                    </div>
                </>
            )}

            {section === 'quiz' && (
                <Quiz onSubmit={(answers) => setQuizAnswers(answers)} />
            )}
        </div>
    );
};

export default App;
