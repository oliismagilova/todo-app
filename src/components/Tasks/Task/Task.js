import React from "react";
import { Button, Card } from 'react-bootstrap';
import './Task.scss';
import { useDispatch } from 'react-redux';
import { changeTaskStatus, removeTask } from './../../../redux/tasksSlice';
import api from './../../../api';

function Task(props) { 
    const dispatch = useDispatch();
    

    const handleStatusClick = () => {
        const id = props.task.id;
        const updatedTask = {
            ...props.task,
            done: !props.task.done
        };

        api.put('/tasks/' + id, updatedTask)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(changeTaskStatus(id));
                }
            });
      //  dispatch(changeTaskStatus(id));
    }

    const handleRemoveClick = () => {
        const id = props.task.id;
         api.delete('/tasks/' + id)
         .then((response) => { 
             if (response.status === 200) {
                  dispatch(removeTask(id)); 
                }
             });
    }
    return (
    <div>
            <Card style={{ width: '600px' }}>
                <Card.Body>
                    <Card.Title>{props.task.description}</Card.Title>
                    <Card.Text>
                        <div>
                            Id: {props.task.id}
                        </div>
                        <div> Status:
                            {props.task.done ?
                                <span style={{ color: '#00AA00' }}>Completed</span> :
                                <span style={{ color: '#DD0000' }}>Open</span>}
                        </div>
                    </Card.Text>
                    {/* <div className="button"> */}
                    <Button className="button" onClick={handleStatusClick} variant="outline-success" >Change status </Button>
                    {/* </div> */}
                    {/* <div className="button"> */}
                    <Button className="button" onClick={handleRemoveClick} variant="outline-danger" > Remove Task </Button>
                    {/* </div>       */}
                </Card.Body>
            </Card>
    </div>
    ); 
}
 export default Task;