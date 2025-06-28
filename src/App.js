import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PopupSelector from './PopupSelector';

const categoryMap = {
    "CPU": "CPU",
    "GPU": "GPU",
    "RAM": "RAM",
    "SSD": "SSD",
    "Motherboard": "マザーボード"
};

// 🔥 React Query の設定
const fetchParts = async () => {
    const { data } = await axios.get('http://localhost:5000/parts');
    return data;
};

function App() {
    const [selectedParts, setSelectedParts] = useState({});
    const [popupCategory, setPopupCategory] = useState(null);
    const { data: parts = [], isLoading, error } = useQuery({
        queryKey: ['parts'],
        queryFn: fetchParts
    });

    const handleSelectPart = (category, part) => {
        setSelectedParts(prev => ({ ...prev, [category]: part }));
    };

    const handleRemovePart = (category) => {
        setSelectedParts(prev => {
            const newParts = { ...prev };
            delete newParts[category];
            return newParts;
        });
    };

    if (isLoading) return <p>読み込み中...</p>;
    if (error) return <p>データ取得に失敗しました！</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">パけこみ！ 自作PCパーツ検索&構成見積もり</h1>

            <table className="w-full border-collapse border border-gray-300 mt-4">
                <tbody>
                    {Object.keys(categoryMap).map(category => (
                        <tr key={category}>
                            <td className="border border-gray-300 px-4 py-2"><button key={category} onClick={() => setPopupCategory(category)}>
                        {categoryMap[category]}
                    </button>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {selectedParts[category] ? selectedParts[category].name : "-"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {selectedParts[category] ? `¥${selectedParts[category].price}` : "-"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                  {selectedParts[category] && (
                                    <button 
                                        onClick={() => handleRemovePart(category)} 
                                        className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                    >
                                        削除
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {popupCategory && (
                <PopupSelector
                    category={popupCategory}
                    parts={parts.filter(p => p.category === popupCategory)}
                    onSelect={handleSelectPart}
                    onClose={() => setPopupCategory(null)}
                    isOpen={true}
                />
            )}

            <h2 className="mt-4 text-xl font-bold">合計金額: ¥{
                Object.values(selectedParts).reduce((sum, part) => sum + part.price, 0)
            }</h2>
        </div>
    );
}

export default App;