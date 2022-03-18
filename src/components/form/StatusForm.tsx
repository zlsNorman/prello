import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { projectApi } from "../../hooks/projectApi";
import { Status } from "../../types/project";

export default function StatusForm() {
  const [statusText, setStatusText] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const navigate = useNavigate();

  const onSave = (status: Status) => {
    projectApi("POST", "/status", () => navigate("/settings"), status);
  };
  return (
    <div>
      <Form
        name="statusForm"
        onFinish={(inputedValues) => onSave(inputedValues)}
        autoComplete="off"
        fields={[
          {
            name: "status",
            value: statusText,
          },
          {
            name: "backgroundColor",
            value: backgroundColor,
          },
        ]}
      >
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Place input your statusname" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="backgroundColor"
          name="backgroundColor"
          rules={[
            { required: true, message: "Place input your backgroundColor" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
