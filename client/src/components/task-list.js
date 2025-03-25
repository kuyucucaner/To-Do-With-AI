import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskByUserId , deleteTask} from "../redux/slices/task-slice";
import { useNavigate } from "react-router-dom";
import { Table , Button} from "antd";


const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, error, loading } = useSelector((state) => state.task);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTaskByUserId());
  }, [dispatch]);

  const handleDelete = async (taskId) => {
   await dispatch(deleteTask(taskId));
   dispatch(getTaskByUserId()); 
  };
  const handleEdit = (taskId) => {
    navigate(`/update-task/${taskId}`);
  };
  const columns = [
    { title : 'Title' , dataIndex : 'title' , key : 'title' },
    { title : 'Description' , dataIndex : 'description' , key : 'description' },
    { title : 'Due Date' , dataIndex : 'dueDate' , key : 'dueDate' },
    { title : 'Is Completed' , dataIndex : 'completed' , key : 'completed' },
    { title : 'Tags' , dataIndex : 'tags' , key : 'tags' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_ , record) => (
        <>
          <Button onClick={() => handleEdit(record._id)} type="link">
            Edit
          </Button>
          <Button onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
    
  ];
  return(
    <div className="container">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <Button onClick={() => navigate("/create-task")} type="primary">Create Task</Button>
        <Table
        columns={columns}
        dataSource={tasks && Array.isArray(tasks.tasks) ? tasks.tasks : []}
        rowKey="_id"
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
          rowExpandable: (record) => record.title !== 'Not Expandable', // Eğer istenen şartı sağlıyorsa
        }}
      />
    </div>
  )
};

export default TaskList;
