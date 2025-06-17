"use client";

import React, { useState } from "react";
import { Button, Form, Input, Segmented, message, DatePicker } from "antd";
import { useAuthActions, useAuthState } from "@/providers/authProvider";
import { IClientRegistration, IUserRegistration } from "@/providers/authProvider/context";

const RegisterForm = () => {
  const [role, setRole] = useState<"Trainer" | "Client">("Trainer");
  const [form] = Form.useForm();
  const { registerTrainer, registerClient } = useAuthActions();
  const { isPending } = useAuthState();

  interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactNumber: string;
  policiesAccepted: boolean;
  //dateOfBirth?: string;
 }
  const onFinish = (values: RegisterFormValues) => {
    try {
      if (role === "Trainer") {
        const registrationData: IUserRegistration = {
          name: values.name,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          contactNumber: values.contactNumber,
          policiesAccepted: values.policiesAccepted,
          role: "admin",
          planType: "base",
          activeState: true,
          trial: false,
        };
        registerTrainer(registrationData);
        message.success("Trainer registration submitted!");
      } else {
        const clientRegData: IClientRegistration = {
          name: values.name,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          contactNumber: values.contactNumber,
          policiesAccepted: values.policiesAccepted,
         // dateOfBirth: values.dateOfBirth?.format('YYYY-MM-DD') || "",
          role: "client",
        };
        registerClient(clientRegData);
        message.success("Client registration submitted!");
      }
    } catch (error) {
      message.error("Registration failed. Please try again.");
      console.error("Registration error:", error);
    }
  };

  const handleRoleChange = (value: "Trainer" | "Client") => {
    setRole(value);
    form.resetFields(["dateOfBirth"]); // Reset date of birth when switching roles
  };

  if (isPending) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 600, margin: '0 auto' }}
      scrollToFirstError
    >
      <Form.Item label="Register as:">
        <Segmented
          options={["Trainer", "Client"]}
          value={role}
          onChange={handleRoleChange}
          block
        />
      </Form.Item>

      <Form.Item
        name="name"
        label="Full Name"
        rules={[{ required: true, message: 'Please input your full name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { type: 'email', message: 'Please enter a valid email!' },
          { required: true, message: 'Please input your email!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="contactNumber"
        label="Contact Number"
        rules={[{ required: true, message: 'Please input your contact number!' }]}
      >
        <Input />
      </Form.Item>

      {role === "Client" && (
        <Form.Item
          name="dateOfBirth"
          label="Date of Birth"
          rules={[{ required: true, message: 'Please select your date of birth!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      )}

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="policiesAccepted"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject('You must accept the policies'),
          },
        ]}
      >
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={isPending}>
          Create Account
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;