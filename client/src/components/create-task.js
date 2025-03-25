import React , { useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { AddTask } from '../redux/slices/task-slice';

const CreateTask = () => {
    const dispatch = useDispatch();
    const {  error } = useSelector((state) => state.task);
    const [taskData, setTaskData] = useState({
        title : "",
        description : "",
        dueDate : "",
        imageUrl : "",
        fileUrl : "",
        tags : [],
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(AddTask(taskData));
        setTaskData({
            title : "",
            description : "",
            dueDate : "",
            imageUrl : "",
            fileUrl : "",
            tags : [],
        });
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Task Title" value={taskData.title} onChange={(e) => setTaskData({...taskData, title : e.target.value })} />
                <input type="text" placeholder="Task Description" value={taskData.description} onChange={(e) => setTaskData({...taskData, description : e.target.value })} />
                <input type="date" placeholder="Due Date" value={taskData.dueDate} onChange={(e) => setTaskData({...taskData, dueDate : e.target.value })} />
                <input type="text" placeholder="Image URL" value={taskData.imageUrl} onChange={(e) => setTaskData({...taskData, imageUrl : e.target.value })} />
                <input type="text" placeholder="file URL" value={taskData.fileUrl} onChange={(e) => setTaskData({...taskData, fileUrl : e.target.value })} />
                <input type="text" placeholder="tags" value={taskData.tags} onChange={(e) => setTaskData({...taskData, tags: e.target.value.split(",") })}
 /> <button type="submit">Create Task</button>

            </form>
            {error && <p>{error}</p>}

        </div>
    )
};

export default CreateTask;