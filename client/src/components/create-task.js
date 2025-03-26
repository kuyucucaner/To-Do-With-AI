import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/slices/task-slice";
import { Card, Form, Button, Input, Alert, Select } from "antd";
import { useNavigate } from "react-router-dom";
const CreateTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.task);
  const [selectedPhotoFiles, setSelectedPhotoFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    photos: [],
    files: [],
    tags: [],
  });

  const handlePhotoFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") && file.size < 5 * 1024 * 1024
    );
    if (validFiles.length !== files.length) {
      console.error("Only images under 5MB are allowed!");
    }
    setSelectedPhotoFiles(validFiles);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter((file) =>  file.size < 5 * 1024 * 1024);
    if (validFiles.length !== files.length) {
      console.error("Only files under 5MB are allowed!");
    }
    setSelectedFiles(validFiles);
  };

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("title", taskData.title);
    formData.append("description", taskData.description);
    formData.append("dueDate", taskData.dueDate);
    formData.append("tags", JSON.stringify(taskData.tags));
    selectedPhotoFiles.forEach((file) => {
      formData.append("photos", file);
    });
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });
    await dispatch(addTask(formData));
    setTaskData({
      title: "",
      description: "",
      dueDate: "",
      photos: [],
      files: [],
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
          encType="multipart/form-data"
          name="create-task-form"
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="title"
            initialValue={taskData.title}
            rules={[
              { required: true, message: "Please input your task title!" },
            ]}
          >
            <Input
              placeholder="Task Title"
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            name="description"
            initialValue={taskData.description}
            rules={[
              {
                required: true,
                message: "Please input your task description!",
              },
            ]}
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
            name="tags"
            initialValue={taskData.tags.length > 0 ? taskData.tags : []}
            rules={[{ required: true, message: "Please input task tags!" }]}
          >
            <Select
              mode="tags"
              placeholder="Choose tags"
              onChange={(tags) => setTaskData({ ...taskData, tags })}
            />
          </Form.Item>
          <Form.Item
          label="Photo"
            name="photos"
            rules={[{ required: false, message: "Please add photo!" }]}
          >
            <Input
              type="file"
              name="photos"
              multiple
              placeholder="photos"
              onChange={handlePhotoFileChange}
            />
          </Form.Item>
          <Form.Item
            label="File"
            name="files"
            rules={[{ required: false, message: "Please upload a file!" }]}
          >
            <Input
              type="file"
              name="files"
              multiple
              accept=".pdf, .docx, .xlsx, .txt" 
              placeholder="Choose files"
              onChange={handleFileChange}
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
