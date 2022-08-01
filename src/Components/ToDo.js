import React, { useEffect, useState } from 'react';
import { isCompleted, store } from "./reducers";
import { addItems } from "./reducers";
import { useSelector } from 'react-redux';

export default function ToDo () {
    var [task, setTask] = useState("");
    var [allTasks, setAllTasks] = useState([]);
    var [action, setAction] = useState("ALL");
    var copyRedux = useSelector((state) => state.value)

    useEffect(() => {
        setAllTasks(copyRedux);
    },[copyRedux])

    var handleInput = (e) => {
        setTask(e.target.value);
    };

    var handleAdd = () => {
        store.dispatch(addItems(task));
        setTask("");
    };

    var handleCompleted = (id) => {
        console.log(id)
        store.dispatch(isCompleted([id,true]));
    };

    var handleFilter = (e) => {
        var copy;
        if (e.target.name === "ALL"){
            setAllTasks(copyRedux);
            setAction("ALL");
        }
        else if (e.target.name === "ACTIVE"){
            copy = copyRedux.filter((task) => {
                if (!task.isCompleted){
                    return task;
                }
            })
            setAllTasks(copy);
            setAction("ACTIVE")
        }
        else{
            copy = copyRedux.filter((task) => {
                if (task.isCompleted){
                    return task;
                }
            })
            setAllTasks(copy);
            setAction("COMPLETED")
        }
    }

    return (
        <>
            <input onChange={handleInput} value={task} placeholder="Add a Task"></input>
            <button onClick={handleAdd}>Add</button><br/>
            <button onClick={handleFilter} name="ALL">All</button>
            <button onClick={handleFilter} name="ACTIVE">Active</button>
            <button onClick={handleFilter} name="COMPLETED">Completed</button>
            <br/><br/>

            {action === "ALL" &&
                <>
                    <h3>ALL</h3>
                    {allTasks.map((t,id) => {
                        return <p onClick={()=>handleCompleted(id+1)} key={id+1} value={id+1}>
                            {!t.isCompleted && 
                                t.task
                            }
                            {t.isCompleted && 
                                <s>{t.task}</s>
                            }
                            </p>
                    })}
                </>
            }

            {action === "ACTIVE" &&
                <>
                    <h3>ACTIVE</h3>
                    {allTasks.map((t,id) => {
                        return <p key={id+1}>{t.task}</p>
                    })}
                </>
            }

            {action === "COMPLETED" &&
                <>
                    <h3>COMPLETED</h3>
                    {allTasks.map((t,id) => {
                        return <p key={id+1}><s>{t.task}</s></p>
                    })}
                </>
            }

        </>
    );
}