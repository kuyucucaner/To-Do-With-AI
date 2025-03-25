import React from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { deleteTask } from '../redux/slices/task-slice';
import { useParams , useNavigate } from 'react-router-dom';

const DeleteTask = () => {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.task);
    const { id } = useParams();
    const navigate = useNavigate();


    const handleDelete = () => {
        dispatch(deleteTask(id));
        navigate("/tasks");  
    };

    return (
        <div>
            <button onClick={handleDelete}>Delete Task</button>
            {error && <div>{error}</div>}
        </div>
    );

};

export default DeleteTask;