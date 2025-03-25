import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/slices/task-slice";
import { Card, Form, Button, Input, Alert } from "antd";
import { useNavigate } from "react-router-dom";
const CreateTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.task);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    imageUrl: "",
    fileUrl: "",
    tags: [],
  });
  const handleSubmit = async (e) => {
    await dispatch(addTask(taskData));
    setTaskData({
      title: "",
      description: "",
      dueDate: "",
      imageUrl: "",
      fileUrl: "",
      tags: [],
    });
    navigate("/task");
  };
  return (
    <div className="container">
      <Card
        title="Create Task"
        variant="outlined"
        style={{
          textAlign: "center",
          borderRadius: "10px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.34)",
          padding: "30px",
        }}
      >
        <Form
          name="create-task-form"
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="title"
            initialValue={taskData.title}
            rules={[{ required: true, message: "Please input your task title!" }]}
          >
            <Input               placeholder="Task Title"
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            name="description"
            initialValue={taskData.description}
            rules={[{ required: true, message: "Please input your task description!" }]}
          >
            <Input.TextArea
              placeholder="Task Description"
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            name="dueDate"
            initialValue={taskData.dueDate}
            rules={[{ required: true, message: "Please input the due date!" }]}
          >
            <Input
              type="date"
              onChange={(e) =>
                setTaskData({ ...taskData, dueDate: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            name="imageUrl"
            initialValue={taskData.imageUrl}
            rules={[{ required: false, message: "Please input the image URL!" }]}
          >
            <Input
              placeholder="Image URL"
              onChange={(e) =>
                setTaskData({ ...taskData, imageUrl: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            name="fileUrl"
            initialValue={taskData.fileUrl}
            rules={[{ required: false, message: "Please input the file URL!" }]}
          >
            <Input
              placeholder="File URL"
              onChange={(e) =>
                setTaskData({ ...taskData, fileUrl: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            name="tags"
            initialValue={taskData.tags.join(", ")}
            rules={[{ required: true, message: "Please input task tags!" }]}
          >
            <Input
              placeholder="Tags"
              onChange={(e) =>
                setTaskData({ ...taskData, tags: e.target.value.split(",") })
              }
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Task
            </Button>
          </Form.Item>
                  </Form>
      </Card>
      {error && <Alert message={error} type="error" />}
    </div>
  );
};

export default CreateTask;
