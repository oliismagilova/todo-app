import {useState, useEffect} from "react";
import uuid from 'react-uuid';
import Task from "./Task/Task";
import { Button } from 'react-bootstrap';
import Form from "./Form/Form";
//import { useSelector } from "react-redux";
import { useSelector, useDispatch } from 'react-redux';
import { setTasks, clearTasks } from './../../redux/tasksSlice';
import api from './../../api';

export default function Tasks () {
    const tasks = useSelector((state) => state.tasks.list);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
   
    useEffect(()=> {
        api.get('/tasks')
        .then((response) => {
             if (response.status === 200) { 
                 dispatch(setTasks(response.data)); 
                 setLoading(false);
                }
             });
       // dispatch(setTasks(tasks));
       // setTasks(tasks);
    }, []);

    const handleClearTasks = () => {
       // setTasks([]);
        api.delete('/tasks/all')
        .then((response) => {
            if (response.status === 200) { 
                dispatch(clearTasks());
             }
         });
        //dispatch(clearTasks());
    }
       
        return (
            <div>
                <h2 className="tasks"> These are the tasks: </h2>
                {loading &&
                 (
                 <div className='loading'>Loading...</div>
                 )}
                {tasks.map(
                    (task, index) => (
                        <Task
                            key={index}
                            task={task}
                            
                        />
                    )
                )}
                <Button className="buttonClear" onClick={handleClearTasks} variant="outline-primary">Clear Tasks</Button>
                <h2 className="tasks"> Add a new task: </h2>
                <Form />
            </div>

        )
    
}