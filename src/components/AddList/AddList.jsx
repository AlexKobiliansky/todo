import React, {useEffect, useState} from "react";
import addSvg from "../../assets/img/add.svg";
import List from "../List/List";
import './AddList.sass';
import axios from 'axios';

import closeSvg from '../../assets/img/close.svg';
import Badge from "../Badge/Badge";

const AddList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (Array.isArray(colors)) {
            selectColor(colors[0].id);
        }
    }, [colors]);

    const onClose = () => {
        setVisiblePopup(false)
        setInputValue('')
        selectColor(colors[0].id)
    }

    const addList = () => {
        if (!inputValue) {
            alert('Введите название списка!');
            return;
        }
        setIsLoading(true);
        axios
            .post('http://localhost:3001/lists', {
                name: inputValue,
                colorId: selectedColor
            })
            .then(({ data }) => {
                const color = colors.filter(c => c.id === selectedColor)[0].name;
                const listObj = { ...data, color: { name: color } };
                onAdd(listObj);
                onClose();
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="add-list">
            <List
                onClick={() => setVisiblePopup(true)}
                items={[
                    {
                        className: 'list__add-button',
                        icon: addSvg,
                        name: "Добавить список"
                    }
                ]}
            />
            {visiblePopup && <div className='add-list__popup'>
                <img src={closeSvg} alt="закрыть" className="add-list__popup-close-btn" onClick={onClose}/>
                <input
                    type="text"
                    placeholder="Название списка"
                    className="field"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
                <div className="add-list__popup-colors">
                    {
                        colors.map(color =>
                            <Badge
                                onClick={() => selectColor(color.id)}
                                key={color.id}
                                color={color.name}
                                className={selectedColor === color.id && 'active'}
                            />)
                    }
                </div>
                <button onClick={addList} className="button">
                    {isLoading ? 'Добавление...' : 'Добавить'}
                </button>
            </div>}
        </div>
    )
}

export default AddList;