import { Card, Space, Tag } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Project } from "../types/project";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  ProfileOutlined,
  RestOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import css from "../style/board.module.css";
import { ModalPopup } from "./extra/ModalPopup";

interface Props {
  project: Project;
}

export default function Cards({ project }: Props) {
  const navigate = useNavigate();
  const [{ isDragging }, dragRef] = useDrag({
    type: "card",
    item: { project },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const tagSize = 3;

  const [visible, setVisible] = useState<boolean>(false);
  const showModal = () => {
    setVisible(true);
  };

  return (
    <>
      <ModalPopup
        title={"Delte Project"}
        text={"do you wanna Delete this Project"}
        waitingText={"only seconds until the delete is done..."}
        visible={visible}
        setVisible={setVisible}
        project={project}
      ></ModalPopup>
      <div className={isDragging ? css.dragging : ""} ref={dragRef}>
        <Card
          style={{ width: "100%" }}
          cover={project.url && <img alt={"no picture"} src={project.url} />}
          actions={[
            <RestOutlined onClick={showModal} key="trash" />,
            <ProfileOutlined
              key="show"
              onClick={() => navigate(`/board/project/${project.id}`)}
            />,
            <EditOutlined
              key="edit"
              onClick={() => navigate(`/board/project/${project.id}/edit`)}
            />,
          ]}
        >
          <Space direction="vertical">
            <div className={css.tags} id="tags">
              {project.language &&
                project.language
                  .slice(0, tagSize)
                  .map((language, index, slicedArray) => {
                    return (
                      <div key={language.id}>
                        <Tag key={language.id} color={language.backgroundColor}>
                          {language.title}
                        </Tag>
                        {project.language &&
                        project.language?.length > tagSize &&
                        slicedArray.length === index + 1
                          ? "..."
                          : ""}
                      </div>
                    );
                  })}
            </div>
            <Meta title={project.title} description={project.description} />
          </Space>
        </Card>
      </div>
    </>
  );
}
