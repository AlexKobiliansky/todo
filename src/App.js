import React, {useState} from 'react';
import List from './components/List/List';

import listSvg from "./assets/img/list.svg";
import AddList from "./components/AddList/AddList";
import Tasks from "./components/Tasks/Tasks";

import DB from './assets/db.json'

function App() {
    const [lists, setLists] = useState(
        DB.lists.map(item => {
            item.color = DB.colors.filter(color => color.id === item.colorId)[0].name;
            return item;
        })
    );

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


            <List
                items={lists}
                isRemovable
                onRemove={(item) => console.log(item)}
            />


            <AddList onAdd={onAddList} colors={DB.colors}/>
        </div>
          <div className="todo__tasks">
            <Tasks />
          </div>
      </div>
  );
}

export default App;
