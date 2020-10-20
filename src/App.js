import React, {useState, useEffect} from 'react';
import axios from 'axios';
import listSvg from "./assets/img/list.svg";

import {List, AddList, Tasks} from './components'



function App() {
    const [lists, setLists] = useState(null)
    const [colors, setColors] = useState(null)

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
                    isRemovable
                />
            ) : (
                'Загрузка...'
            )}
            <AddList onAdd={onAddList} colors={colors} />
          </div>
          <div className="todo__tasks">{lists && <Tasks list={lists[1]} />}</div>
      </div>
  );
}

export default App;
