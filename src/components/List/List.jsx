import React from "react";
import './List.sass';
import classNames from 'classnames';
import Badge from "../Badge/Badge";
import removeSvg from '../../assets/img/remove.svg';

const List = ({ items, isRemovable, onClick, onRemove }) => {

    const removeList = (item) => {
        if (window.confirm("Вы действительно хотите удалить список?")) {
            onRemove(item);
        }

    }

    return (
        <ul className="list" onClick={onClick}>
            {
                items.map((item, index) => (
                    <li key={index} className={classNames(item.className, {'active': item.active})}>
                        <i>{item.icon ? <img src={item.icon} alt="list icon"/> : <Badge color={item.color}/>}</i>
                        <span>{item.name}</span>
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

