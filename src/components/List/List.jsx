import React from "react";
import './List.sass';
import classNames from 'classnames';
import Badge from "../Badge/Badge";
import removeSvg from '../../assets/img/remove.svg';
import axios from 'axios';

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {

    const removeList = (item) => {
        if (window.confirm("Вы действительно хотите удалить список?")) {
            axios.delete('http://localhost:3003/lists/' + item.id).then(() => {
                onRemove(item.id);
            });
        }

    }

    return (
        <ul className="list" onClick={onClick}>
            {
                items.map((item, index) => (
                    <li key={index}
                        className={classNames(item.className, {'active': item.active ? item.active : activeItem && activeItem.id === item.id})}
                        onClick={onClickItem ? () => onClickItem(item) : null} >
                        <i>{item.icon ? <img src={item.icon} alt="list icon"/> : <Badge color={item.color.name}/>}</i>
                        <span>{item.name}{item.tasks && item.tasks.length > 0 && ` (${item.tasks.length})`}</span>
                        {isRemovable && <img
                            className="list__remove-icon"
                            src={removeSvg}
                            alt="remove icon"
                            onClick={() => removeList(item)}/>}
                    </li>
                ))
            }

        </ul>
    )
}

export default List;

