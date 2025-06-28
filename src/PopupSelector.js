import { useState } from 'react';
import './Modal.css'; // 🔥 先ほどのCSSを適用

const PopupSelector = ({ category, parts, onSelect, onClose }) => {
    return (
        <>
            <div className="overlay show" onClick={onClose}></div>
            <div className="modal show">
                <h2>{category} 選択</h2>
                <ul>
                    {parts.map((part) => (
                        <li key={part.name}>
                            <button onClick={() => { onSelect(category, part); onClose(); }}>
                                {part.name} - ¥{part.price}
                            </button>
                        </li>
                    ))}
                </ul>
                <button onClick={onClose}>閉じる</button>
            </div>
        </>

    );
};

export default PopupSelector;
