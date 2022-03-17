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
  Image,
} from "antd";
import moment from "moment";
import { FieldData } from "rc-field-form/lib/interface";
import { RangeValue } from "rc-picker/lib/interface";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { projectApi, useProjectApi } from "../../hooks/projectApi";
import useIsMobile from "../../hooks/useIsMobile";
import {
  formProject,
  Language,
  Project,
  Status,
  StatusType,
} from "../../types/project";
import LoadingSpinner from "../extra/LoadingSpinner";
const { RangePicker } = DatePicker;
const { Option } = Select;

interface Props {
  pageTitle: string;
  title: string;
  language: string[];
  description: string;
  dateFrom?: Date;
  dateTo?: Date;
  author: string;
  url: string;
  status: StatusType;
  isEdit?: boolean;
  isDetails?: boolean;
  id?: number;
}

export default function ProjectForm(props: Props) {
  const navigate = useNavigate();
  const size = "large";
  const isMobile = useIsMobile();

  const [form] = Form.useForm();
  const [supportedLanguages] = useProjectApi<Language[]>("/languages");
  const [statuses] = useProjectApi<Status[]>("/status");

  const [title, setTitle] = useState(props.title);
  const [language, setLanguage] = useState<string[]>(props.language);
  const [description, setDescription] = useState(props.description);
  const [dateFrom, setDateFrom] = useState<Date | undefined>(props.dateFrom);
  const [dateTo, setDateTo] = useState<Date | undefined>(props.dateTo);
  const [author, setAuthor] = useState(props.author);
  const [url, setUrl] = useState(props.url);
  const [status, setStatus] = useState(props.status);

  const [isDetails, setIsDetails] = useState(props.isDetails);
  const [pageTitle, setPageTitle] = useState(props.pageTitle);

  if (!form || !supportedLanguages || !statuses) {
    return <LoadingSpinner />;
  }

  const formFields = [
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
      value: [dateFrom ? moment(dateFrom) : "", dateTo ? moment(dateTo) : ""],
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
  ];

  const disableButto = () => {
    return (
      title == "" ||
      description == "" ||
      !!form.getFieldsError().filter(({ errors }) => errors.length).length
    );
  };

  const dateStringtoDate = (
    moment: RangeValue<moment.Moment>,
    datestring: string[]
  ) => {
    setDateFrom(new Date(datestring[0]));
    setDateTo(new Date(datestring[1]));
  };

  const onsave = (inputvalues: formProject) => {
    projectApi(
      props.isEdit ? "PUT" : "POST",
      props.isEdit ? `/projects/${props.id}` : "/projects/",
      () => navigate("/board"),
      {
        ...inputvalues,
        //string to language object
        language: inputvalues.language?.map((lang) =>
          supportedLanguages.find((supLang) => supLang.title === lang)
        ),
      }
    );
  };
  const editPage = (): void => {
    setPageTitle("Edit Project");
    setIsDetails(false);
  };

  return (
    <div style={{ margin: "2rem" }}>
      <Divider>{pageTitle}</Divider>
      <Row wrap={isMobile}>
        <Col flex="30%"></Col>
        <Col flex="auto">
          <Form
            form={form}
            name="projectForm"
            autoComplete="off"
            layout="vertical"
            onFinish={(e) => onsave(e)}
            fields={formFields}
          >
            <Form.Item
              name="title"
              label="Project Title"
              rules={[{ required: true, message: "Please input your title!" }]}
            >
              <Input
                readOnly={isDetails}
                onChange={(e) => setTitle(e.target.value)}
                size={size}
              />
            </Form.Item>
            <Form.Item
              name="language"
              label="Select Language [Multiple]"
              rules={[{ type: "array" }]}
            >
              <Select
                disabled={isDetails}
                size={size}
                mode="multiple"
                allowClear
                tokenSeparators={[","]}
                onChange={(value) => setLanguage(value)}
              >
                {supportedLanguages.map(({ title }) => (
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
                readOnly={isDetails}
                onChange={(e) => setDescription(e.target.value)}
                size={size}
              ></Input.TextArea>
            </Form.Item>
            <Row style={{ columnGap: "5%" }}>
              <Col style={{ flexGrow: "1" }}>
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[
                    {
                      required: true,
                      message: "Please select a status",
                    },
                  ]}
                >
                  <Select
                    disabled={isDetails}
                    size={size}
                    onChange={(value) => setStatus(value)}
                  >
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
                    disabled={isDetails}
                    style={{ width: "100%" }}
                    size={size}
                    onChange={(moment, string) =>
                      dateStringtoDate(moment, string)
                    }
                    allowClear={false}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="author" label="Author">
              <Input
                readOnly={isDetails}
                onChange={(e) => setAuthor(e.target.value)}
                size={size}
              />
            </Form.Item>
            <Image width={200} src={url} />
            <Form.Item
              name="url"
              label="URL"
              rules={[{ type: "url", message: "not a valid url" }]}
            >
              <Input
                readOnly={isDetails}
                onChange={(e) => setUrl(e.target.value)}
                size={size}
              />
            </Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              {isDetails ? (
                <Button type="primary" size={size} onClick={() => editPage()}>
                  Edit
                </Button>
              ) : (
                <div></div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  gap: "1rem",
                }}
              >
                <Button
                  type="primary"
                  size={size}
                  onClick={() => navigate("/board")}
                >
                  back
                </Button>
                <Form.Item shouldUpdate>
                  {!isDetails ? (
                    () => (
                      <Button
                        type="primary"
                        htmlType="submit"
                        size={size}
                        disabled={disableButto()}
                      >
                        Save
                      </Button>
                    )
                  ) : (
                    <div></div>
                  )}
                </Form.Item>
              </div>
            </div>
          </Form>
        </Col>
        <Col flex="30%"></Col>
      </Row>
    </div>
  );
}
