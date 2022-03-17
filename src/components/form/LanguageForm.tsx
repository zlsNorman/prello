import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { projectApi } from "../../hooks/projectApi";
import { Language } from "../../types/project";

export default function LanguageForm() {
  const [languageText, setLanguageText] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const navigate = useNavigate();

  const onSave = (language: Language) => {
    projectApi("POST", "/languages", () => navigate("/settings"), language);
  };
  return (
    <div>
      <Form
        name="languageForm"
        onFinish={(inputedValues) => onSave(inputedValues)}
        autoComplete="off"
        fields={[
          {
            name: "title",
            value: languageText,
          },
          {
            name: "backgroundColor",
            value: backgroundColor,
          },
        ]}
      >
        <Form.Item
          label="title"
          name="title"
          rules={[
            { required: true, message: "Place input your Script-Language" },
          ]}
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
