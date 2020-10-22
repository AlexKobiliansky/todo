import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Route, useHistory, useLocation} from 'react-router-dom';

import listSvg from "./assets/img/list.svg";

import {List, AddList, Tasks} from './components';


function App() {
    const [lists, setLists] = useState(null);
    const [colors, setColors] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    let history = useHistory();
    let location = useLocation();

    useEffect(() => {
        axios.get('http://localhost:3003/lists?_expand=color&_embed=tasks').then(({data}) => {
            setLists(data)
        });
        axios.get('http://localhost:3003/colors').then(({data}) => {
            setColors(data)
        });
    }, [])

    const onAddList = (obj) => {
        const newList = [
            ...lists,
            obj
        ]
        setLists(newList)
    }

    const onCompleteTask = (listId, taskId, completed) => {
        const newList = lists.map(item => {
            if (item.id === listId) {
                item.tasks = item.tasks.map(task => {
                    if(task.id === taskId) {
                        task.completed = completed
                    }
                    return task;
                });
            }
            return item;
        });
        setLists(newList);
        axios.patch('http://localhost:3003/tasks/' + taskId, {completed: completed}).catch(() => {
            alert('Не удалось обновить задачу');
        });
    }

    const onEditListTitle = (id, title) => {
        const newList = lists.map(item => {
            if (item.id === id) {
                item.name = title;
            }
            return item;
        })
        setLists(newList)
    }

    const onAddTask = (listId, taskObj) => {
        const newList = lists.map(
            item => {
                if (item.id === listId) {
                    item.tasks = [...item.tasks, taskObj];
                }
                return item;
            });

        setLists(newList)

    }

    const onRemoveTask = (listId, taskId) => {
        if (window.confirm('Вы действительно хотите удалить задачу?')){
            const newList = lists.map(item => {
                if (item.id === listId) {
                    item.tasks = item.tasks.filter(task => task.id !== taskId)
                }
                return item;
            });
            setLists(newList);
            axios.delete('http://localhost:3003/tasks/' + taskId).catch(() => {
                alert('Не удалось удалить задачу');
            });
        }
    }

    const onEditTask = (listId, taskObj) => {
        const newTaskText = window.prompt('Текст задачи', taskObj.text);

        if(!newTaskText) {
            return;
        }

        const newList = lists.map(item => {
            if (item.id === listId) {
                item.tasks = item.tasks.map(task => {
                    if(task.id === taskObj.id) {
                        task.text = newTaskText
                    }
                    return task;
                });
            }
            return item;
        });
        setLists(newList);
        axios.patch('http://localhost:3003/tasks/' + taskObj.id, {text: newTaskText}).catch(() => {
            alert('Не удалось удалить задачу');
        });
    }

    useEffect(() => {
        const listId = location.pathname.split('lists/')[1];
        if(lists) {
            const list = lists.find(list => list.id === Number(listId));
            setActiveItem(list);
        }
        // setActiveItem(listId);

    }, [lists, location.pathname])

    return (
        <div className="todo">
            <div className="todo__sidebar">
                <List
                    onClickItem={item => {
                        history.push(`/`)
                    }}
                    items={[
                    {
                        icon: listSvg,
                        name: "Все задачи",
                        active: history.location.pathname === '/'
                    }
                ]}/>

                {lists ? (
                    <List
                        items={lists}
                        onRemove={id => {
                            const newLists = lists.filter(item => item.id !== id);
                            setLists(newLists);
                        }}
                        onClickItem={item => {
                            history.push(`/lists/${item.id}`)
                        }}
                        activeItem={activeItem}
                        isRemovable
                    />
                ) : (
                    'Загрузка...'
                )}
                <AddList onAdd={onAddList} colors={colors}/>
            </div>
            <div className="todo__tasks">
                <Route exact path="/">
                    {lists && lists.map(list => (
                        <Tasks
                            key = {list.id}
                            list={list}
                            onEditTitle={onEditListTitle}
                            onAddTask={onAddTask}
                            onRemoveTask = {onRemoveTask}
                            onEditTask = {onEditTask}
                            onCompleteTask = {onCompleteTask}
                            withoutEmpty/>
                        ))
                    }
                </Route>



                <Route path="/lists/:id">
                    {lists && activeItem &&
                    <Tasks
                        list={activeItem}
                        onEditTitle={onEditListTitle}
                        onAddTask={onAddTask}
                        onRemoveTask = {onRemoveTask}
                        onEditTask = {onEditTask}
                        onCompleteTask = {onCompleteTask}
                    />}
                </Route>
            </div>
        </div>
    );
}

export default App;
