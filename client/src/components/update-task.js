import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask, getTaskById } from "../redux/slices/task-slice";
import { useParams } from "react-router-dom";
import { Card, Form, Button, Input, Alert, Select, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
const UpdateTask = () => {
  const dispatch = useDispatch();
  const { error, selectedTask } = useSelector((state) => state.task);
  const { id } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    completed: false,
    photos: [],
    files: [],
    tags: [],
  });
  useEffect(() => {
    dispatch(getTaskById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedTask) {
      console.log("Gelen task verisi:", selectedTask);
      const newTaskData = {
        title: selectedTask.title,
        description: selectedTask.description || "",
        dueDate: selectedTask.dueDate || "",
        completed: selectedTask.completed || false,
        tags: selectedTask.tags || [],
      };
      setTaskData(newTaskData);
      form.setFieldsValue(newTaskData);
    }
  }, [selectedTask, form]);

  const handleFilePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") && file.size < 5 * 1024 * 1024
    );
    if (validFiles.length !== files.length) {
      console.error("Only images under 5MB are allowed!");
    }
    setTaskData((prevFiles) => ({ ...prevFiles, photos: validFiles }));
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter((file) => file.size < 5 * 1024 * 1024);
    if (validFiles.length !== files.length) {
      console.error("Only files under 5MB are allowed!");
    }
    setTaskData((prevFiles) => ({ ...prevFiles, files: validFiles }));
  };

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("title", taskData.title);
    formData.append("description", taskData.description);
    formData.append("dueDate", taskData.dueDate);
    formData.append("completed", taskData.completed);
    formData.append("tags", JSON.stringify(taskData.tags));
    if (taskData.photos && Array.isArray(taskData.photos)) {
      taskData.photos.forEach((file) => formData.append("photos", file));
    } else {
      console.error("photos is undefined");
    }

    if (taskData.files && Array.isArray(taskData.files)) {
      taskData.files.forEach((file) => formData.append("files", file));
    } else {
      console.error("files is undefined");
    }

    await dispatch(updateTask({ id, taskData: formData }));
    navigate("/task");
  };
  return (
    <div className="container">
      <Card
        title="Update Task"
        encType="multipart/form-data"
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
          form={form}
          initialValues={taskData}
          name="update-task-form"
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="title"
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
              onChange={handleFilePhotoChange}
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
          <Form.Item
            name="completed"
            valuePropName="checked" 
          >
            <Checkbox
              checked={taskData.completed} 
              onChange={
                (e) => setTaskData({ ...taskData, completed: e.target.checked }) 
              }
            >
              Completed
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" warning htmlType="submit" block>
              Update Task
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {error && <Alert message={error} type="error" />}
    </div>
  );
};

export default UpdateTask;
