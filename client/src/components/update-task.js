import React, {  useState , useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask , getTaskById } from "../redux/slices/task-slice";
import { useParams } from "react-router-dom";
import { Card, Form, Button, Input, Alert } from "antd";
import { useNavigate } from "react-router-dom";
const UpdateTask = () => {
  const dispatch = useDispatch();
  const { error , selectedTask } = useSelector((state) => state.task);
  const { id } = useParams();
    const navigate = useNavigate();

    const [form] = Form.useForm(); // Form instance oluşturuyoruz

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
        imageUrl: selectedTask.imageUrl || "",
        fileUrl: selectedTask.fileUrl || "",
        tags: selectedTask.tags || [],
        recommendations: selectedTask.recommendations || [],
      };
      setTaskData(newTaskData);
      form.setFieldsValue(newTaskData); 

    }
  }, [selectedTask, form]);

  const handleSubmit = async (e) => {
    await dispatch(updateTask({ id,  taskData}));
    navigate("/task");
  };
  return (
    <div className="container">
          <Card
              title="Update Task"
              variant="outlined"
              style={{
                textAlign: "center",
                borderRadius: "10px",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.34)",
                padding: "30px",
              }}
            >
      <Form
      form={form}
      initialValues={taskData} 
               name="update-task-form"
               style={{ maxWidth: 600 }}
               onFinish={handleSubmit}
             >
 <Form.Item
            name="title"
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
