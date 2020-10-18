import React, {useState} from "react";
import addSvg from "../../assets/img/add.svg";
import List from "../List/List";
import './AddList.sass';

import closeSvg from '../../assets/img/close.svg';
import Badge from "../Badge/Badge";

const AddList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(colors[0].id);
    const [inputValue, setInputValue] = useState('', );

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
        const color = colors.filter(c => c.id === selectedColor)[0].name;
        onAdd({
            "id": Math.random(),
            "name": inputValue,
            color
        });
        onClose()
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
                <button onClick={addList} className="button">Добавить</button>
            </div>}
        </div>
    )
}




export default AddList;