import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../redux/slices/task-slice";
import { useParams } from "react-router-dom";

const UpdateTask = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.task);
  const { id } = useParams();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    completed: false,
    imageUrl: "",
    fileUrl: "",
    tags: [],
    recommendations: [],
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask({ id: id , taskData : taskData}));
    setTaskData({
      title: "",
      description: "",
      dueDate: "",
      completed: false,
      imageUrl: "",
      fileUrl: "",
      tags: [],
      recommendations: [],
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={taskData.title}
          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={taskData.description}
          onChange={(e) =>
            setTaskData({ ...taskData, description: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="Due Date"
          value={taskData.dueDate}
          onChange={(e) =>
            setTaskData({ ...taskData, dueDate: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          value={taskData.imageUrl}
          onChange={(e) =>
            setTaskData({ ...taskData, imageUrl: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="file URL"
          value={taskData.fileUrl}
          onChange={(e) =>
            setTaskData({ ...taskData, fileUrl: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="tags"
          value={taskData.tags}
          onChange={(e) =>
            setTaskData({ ...taskData, tags: e.target.value.split(",") })
          }
        />{" "}
        <button type="submit">Update Task</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UpdateTask;
