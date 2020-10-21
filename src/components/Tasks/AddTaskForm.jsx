import React, {useState} from "react";
import addSvg from "../../assets/img/add.svg";
import axios from 'axios';

const AddTaskForm = ({list, onAddTask}) => {

    const [visibleForm, setFormVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState('');

    const toggleFormVisible = () => {
        setFormVisible(!visibleForm);
        setInputValue('');
    }

    const addTask = () => {
        const obj = {
            "listId": list.id,
            "text": inputValue,
            "completed": false
        };
        setIsLoading(true)
        axios.post('http://localhost:3003/tasks', obj).then(({data}) => {
            onAddTask(list.id, obj);
            toggleFormVisible();
        })
            .catch(() => {
                alert('Ошибка при добавлении списка!')
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="tasks__form">
            {!visibleForm ? <div onClick={toggleFormVisible} className="tasks__form-new">
                <img src={addSvg} alt="add icon"/>
                <span>Новая задача</span>
            </div> : <div className="tasks__form-block">
                <input
                    type="text"
                    placeholder="Текст задачи"
                    className="field"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
                <button disabled={isLoading} className="button" onClick={addTask}>
                    {isLoading ? 'Добавление...' : 'Добавить задачу'}
                </button>
                <button onClick={toggleFormVisible} className="button button-grey">Отмена</button>
            </div>}



        </div>
    )
}

export default AddTaskForm;