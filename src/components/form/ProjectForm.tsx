import {
  Col,
  Divider,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Space,
  DatePicker,
  Button,
  message,
} from "antd";
import moment from "moment";
import { FieldData } from "rc-field-form/lib/interface";
import { RangeValue } from "rc-picker/lib/interface";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { projectApi, useProjectApi } from "../../hooks/projectApi";
import useIsMobile from "../../hooks/useIsMobile";
import { Language, Project, Status, StatusType } from "../../types/project";
import LoadingSpinner from "../extra/LoadingSpinner";
const { RangePicker } = DatePicker;
const { Option } = Select;

interface Props {
  title: string;
  language: Language[];
  description: string;
  dateFrom?: Date;
  dateTo?: Date;
  author: string;
  url: string;
  status: StatusType;
  isEdit?: boolean;
  id?: number;
}

export default function ProjectForm(props: Props) {
  const navigate = useNavigate();
  const size = "large";
  const isMobile = useIsMobile();

  const [form] = Form.useForm();
  const [languages] = useProjectApi<Language[]>("/languages");
  const [statuses] = useProjectApi<Status[]>("/status");

  const [title, setTitle] = useState(props.title);
  const [language, setLanguage] = useState<Language[]>(props.language);
  const [description, setDescription] = useState(props.description);
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [author, setAuthor] = useState(props.author);
  const [url, setUrl] = useState(props.url);
  const [status, setStatus] = useState(props.status);

  if (!form || !languages || !statuses) {
    return <LoadingSpinner />;
  }

  const disableButto = () => {
    return (
      /* !form.isFieldTouched("description") ||
      !form.isFieldTouched("title") || */
      title == "" ||
      description == "" ||
      !!form.getFieldsError().filter(({ errors }) => errors.length).length
    );
  };

  const dateStringtoDate = (
    moment: RangeValue<moment.Moment>,
    datestring: string[],
    index: number
  ) => {
    if (index == 0) {
      setDateFrom(new Date(datestring[index]));
    } else {
      setDateTo(new Date(datestring[index]));
    }
  };

  const onsave = (inputvalues: Project) => {
    projectApi(
      props.isEdit ? "PUT" : "POST",
      props.isEdit ? `/projects/${props.id}` : "/projects/",
      () => navigate("/board"),
      inputvalues
    );
  };

  return (
    <div style={{ margin: "2rem" }}>
      <Divider>Create Project</Divider>
      <Row wrap={isMobile}>
        <Col flex="30%">30%</Col>
        <Col flex="auto">
          <Form
            form={form}
            name="projectForm"
            autoComplete="off"
            layout="vertical"
            onFinish={(e) => onsave(e)}
            fields={[
              {
                name: "title",
                value: title,
              },
              {
                name: "language",
                value: language,
              },
              {
                name: "description",
                value: description,
              },
              {
                name: "range-date-picker",
                /* value: [moment("2020-03-09 13:00"), moment("2020-03-27 13:17")], */
              },
              {
                name: "author",
                value: author,
              },
              {
                name: "url",
                value: url,
              },
              {
                name: "status",
                value: status,
              },
            ]}
          >
            <Form.Item
              name="title"
              label="Project Title"
              rules={[{ required: true, message: "Please input your title!" }]}
            >
              <Input onChange={(e) => setTitle(e.target.value)} size={size} />
            </Form.Item>
            <Form.Item
              name="language"
              label="Select Language [Multiple]"
              rules={[{ type: "array" }]}
            >
              <Select
                size={size}
                mode="multiple"
                allowClear
                tokenSeparators={[","]}
                onChange={(value) => setLanguage(value)}
              >
                {languages.map(({ title }) => (
                  <Option key={title} value={title}>
                    {title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Project Description"
              name="description"
              rules={[
                { required: true, message: "Please input your Description" },
              ]}
            >
              <Input.TextArea
                onChange={(e) => setDescription(e.target.value)}
                size={size}
              ></Input.TextArea>
            </Form.Item>
            <Row style={{ columnGap: "5%" }}>
              <Col style={{ flexGrow: "1" }}>
                <Form.Item name="status" label="Status">
                  <Select size={size} onChange={(value) => setStatus(value)}>
                    {statuses.map(({ status }) => (
                      <Option key={status} value={status}>
                        {status}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col style={{ flexGrow: "1" }}>
                <Form.Item
                  name="range-date-picker"
                  label="Date Picker"
                  rules={[{ type: "array" as const }]}
                >
                  <RangePicker
                    style={{ width: "100%" }}
                    size={size}
                    onChange={(moment, string) =>
                      dateStringtoDate(moment, string, 0)
                    }
                  ></RangePicker>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="author" label="Author">
              <Input
                onChange={(e) => setAuthor(e.target.value)}
                size={size}
              ></Input>
            </Form.Item>
            <Form.Item
              name="url"
              label="URL"
              rules={[{ type: "url", message: "not a valid url" }]}
            >
              <Input
                onChange={(e) => setUrl(e.target.value)}
                size={size}
              ></Input>
            </Form.Item>
            <div
              style={{ display: "flex", justifyContent: "right", gap: "1rem" }}
            >
              <Button
                type="primary"
                size={size}
                onClick={() => navigate("/board")}
              >
                back
              </Button>
              <Form.Item shouldUpdate>
                {() => (
                  <Button
                    type="primary"
                    htmlType="submit"
                    size={size}
                    disabled={disableButto()}
                  >
                    Save
                  </Button>
                )}
              </Form.Item>
            </div>
          </Form>
        </Col>
        <Col flex="30%">30%</Col>
      </Row>
    </div>
  );
}
