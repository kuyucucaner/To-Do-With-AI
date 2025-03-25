import React  from 'react';
import TaskList from '../components/task-list';
import CreateTask from '../components/create-task';
import UpdateTask from '../components/update-task';
import DeleteTask from '../components/delete-task';

const Task = () => {
    return (
        <div>
            <TaskList />
            <CreateTask/>
            <UpdateTask/>
            <DeleteTask/>
        </div>


    )
    
};

export default Task;