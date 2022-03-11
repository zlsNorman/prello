import { Col, Divider, Form, Input, Layout, Row, Select, Space, DatePicker, Button, message } from 'antd'
import { FieldData } from 'rc-field-form/lib/interface'
import React, { useEffect, useState } from 'react'
import useIsMobile from '../hooks/useIsMobile';
import LoadingSpinner from './extra/LoadingSpinner';
const { RangePicker } = DatePicker;
const { Option } = Select;

export default function ProjectForm() {
  const size = "large"

  const [form] = Form.useForm()
  const isMobile = useIsMobile()


  if (!form) {
    return <LoadingSpinner />
  }
  const test = () => {
    console.log(form.isFieldTouched("title"))
    console.log(form.getFieldsError())
  }

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
          >
            <Form.Item
              name="title"
              label="Project Title"
              rules={[
                { required: true, message: 'Please input your title!' }
              ]} >
              <Input size={size}>
              </Input>
            </Form.Item>
            <Form.Item
              label="Select Language [Multiple]"
              rules={[
                { type: 'array' }
              ]}
            >
              <Select size={size}
                mode="multiple"
                allowClear
                tokenSeparators={[',']}>
                {/*TODO mit map austauschen aus settings */}
                <Option value="1">TS</Option>
                <Option value="2">REACT</Option>
                <Option value="3">KOTLIN</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Project Description"
              name="description"
              rules={[
                { required: true, message: "Please input your Description" }
              ]}>
              <Input.TextArea
                size={size}
                onChange={test}
              />
            </Form.Item>
            <Row style={{ columnGap: "5%" }}
              wrap={false} >
              <Col style={{ flexGrow: "1" }}>
                <Form.Item name="range-date-picker"
                  label="Date Picker"
                  rules={[
                    { type: 'array' as const }
                  ]}>
                  <RangePicker style={{ width: "100%" }}
                    size={size} ></RangePicker>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name="dateInDays"
                  label=" ">
                  <Input placeholder="in Days" size={size} disabled>

                  </Input>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="author" label="Author">
              <Input size={size}>
              </Input>
            </Form.Item>
            <Form.Item name="url" label="URL" rules={[{ type: "url", message: "not a valid url" }]}>
              <Input size={size} />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() =>
                <div style={{ display: "flex", justifyContent: "right" }} >
                  <Button
                    type="primary"
                    htmlType="submit"
                    size={size}
                    disabled={
                      !form.isFieldTouched("description")
                      ||
                      !form.isFieldTouched("title")
                      ||
                      !!form.getFieldsError().filter(({ errors }) => errors.length).length
                    }
                  >
                    Save
                  </Button>
                </div>
              }
            </Form.Item>
          </Form>
        </Col>
        <Col flex="30%">30%</Col>
      </Row>
    </div >


  )
}
