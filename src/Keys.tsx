import { useEffect, useState } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [data, setData] = useState<IItem[]>(props.initialData);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');

    useEffect(() => {
        const sortedData = [...data].sort((a, b) => {
            return props.sorting === 'ASC' ? a.id - b.id : b.id - a.id;
        });
        setData(sortedData);
    }, [props.sorting]);

    const handleClick = (item: IItem) => {
        setEditingId(item.id);
        setEditValue(item.name);
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        item: IItem,
    ) => {
        if (e.key === 'Enter') {
            const newData = data.map((d) =>
                d.id === item.id ? { ...d, name: editValue } : d,
            );
            setData(newData);
            setEditingId(null);
        } else if (e.key === 'Escape') {
            setEditingId(null);
        }
    };

    return (
        <div>
            {data.map((item) => (
                <div key={item.id}>
                    {editingId === item.id ? (
                        <input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, item)}
                            autoFocus
                        />
                    ) : (
                        <span onClick={() => handleClick(item)}>
                            {item.name}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
