import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskByUserId } from "../redux/slices/task-slice";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, error, loading } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getTaskByUserId());
  }, [dispatch]);

  return(
    <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <ul>
        {tasks.length > 0 ? (
            tasks.map((task) => (
                <li key={task._id}>{task.title}</li>
            ))
        ) : (
            <li>No tasks found.</li>
        )}
       </ul>
    </div>
  )
};

export default TaskList;
