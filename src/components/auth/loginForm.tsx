"use client";

import { useAuth } from "@/providers/authProvider";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useState } from "react";

export const LoginForm = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  interface LoginFormValues {
    email: string;
    password: string;
    remember?: boolean;
  }

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      await login(values);
      message.success("Login successful!");
      // Redirect on success
    } catch (error) {
      message.error("Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
      style={{maxWidth: 400, margin: "auto", paddingTop: "3rem"}}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};