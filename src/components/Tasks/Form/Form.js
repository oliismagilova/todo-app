import {useState} from "react";
import uuid from 'react-uuid';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addTask } from './../../../redux/tasksSlice';
import api from './../../../api';

export default function Form (props) {
    const [description, setDescription]=useState("");
    const [done, setDone] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [saving, setSaving] = useState(false);
    const dispatch = useDispatch();



    const handleDescriptionOnChange = (event) => {
            setDescription(event.target.value);
        }

    const handleTaskOnChange = (event) => {
        setDone(event.target.value);
    }

    const handleSubmitButton = (event) => {
        event.preventDefault();

        if (description === '') {
            setDescription('Enter Your Description');
        } else {
            const task = {
                id: uuid(),
                description: description,
                done:done
            }

            setSaving(true);

            api.post('/tasks', task)
            .then((response) => {
                 if (response.status === 201) { 
                     dispatch(addTask(task)); 
                     setDescription(''); 
                     setDone(false);
                    setErrorMessage(null);
                     setSaving(false);
                     } 
                    });
          
        }

    }

  
        return (
            <form onSubmit={handleSubmitButton}>
                <div style={{ margin: 10 }}>
                    {errorMessage && (
                        <div className='error'> Invalid data: {errorMessage}
                        </div>
                    )}
                    <div>
                        <label> Description: </label>
                        <br />
                        <input
                            value={description}
                            maxLength={150}
                            onChange={handleDescriptionOnChange}
                        />
                    </div>
                    <div>
                        <label> Status: </label>
                        <br />
                        <select value={done}
                            onChange={handleTaskOnChange}>
                            <option value={false}> Open </option>
                            <option value={true}> Completed </option>
                        </select>
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Button variant="outline-primary" type="submit" > Add </Button>
                    </div>
                </div>

                {saving && (<div className='saving'>Saving...</div>)}
            </form>
            )
}