import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/user-slice";
import "../styles/register.css";
import { Card, Form, Button, Input, Alert, Spin } from "antd";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useSelector((state) => state.user);

  const handleRegister = async (e) => {
    dispatch(registerUser({ userName, password }));
  };
  useEffect(() => {
    if (user) {
      navigate("/task");
    }
  }, [user, navigate]);
  const handleLogin = () => {
    navigate("/");
  };
  return (
    <div className="register-container">
      <Card
        title="Register"
        variant="outlined"
        style={{
          textAlign: "center",
          borderRadius: "10px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.34)",
          padding: "30px",
        }}
      >
        <Form name="basic" style={{ maxWidth: 600 }} onFinish={handleRegister}>
          <Form.Item
            label="Username"
            name="username"
            initialValue={userName}
            rules={[
              { required: true, message: "Please choose your username!" },
            ]}
          >
            <Input onChange={(e) => setUserName(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            initialValue={password}
            rules={[
              { required: true, message: "Please choose your password!" },
            ]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Register
            </Button>
            <Button
              type="primary"
              danger
              onClick={handleLogin}
              style={{ marginTop: 10 }}
            >
              If you have an account go LOG IN!
            </Button>
          </Form.Item>

        </Form>
      </Card>
 {loading && <div style={{ textAlign: 'center', marginTop: '20px' }}><Spin /></div>}
{error && <Alert message={error} type="error" showIcon style={{ marginTop: '20px' }} />}
    </div>
  );
};

export default Register;
