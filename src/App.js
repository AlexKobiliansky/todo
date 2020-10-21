import React, {useState, useEffect} from 'react';
import axios from 'axios';
import listSvg from "./assets/img/list.svg";

import {List, AddList, Tasks} from './components'



function App() {
    const [lists, setLists] = useState(null)
    const [colors, setColors] = useState(null)
    const [activeItem, setActiveItem] = useState(null)

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




  return (
      <div className="todo">
        <div className="todo__sidebar">
            <List items={[
                {
                    icon: listSvg,
                    name: "Все задачи",
                    active: true
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
                        setActiveItem(item);
                    }}
                    activeItem={activeItem}
                    isRemovable
                />
            ) : (
                'Загрузка...'
            )}
            <AddList onAdd={onAddList} colors={colors} />
          </div>
          <div className="todo__tasks">{lists && activeItem &&
          <Tasks
              list={activeItem}
              onEditTitle={onEditListTitle}
              onAddTask={onAddTask}  />}</div>
      </div>
  );
}

export default App;
