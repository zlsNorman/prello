import { Card } from "antd";
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
import { Navigate, useNavigate } from "react-router";
import css from "../style/board.module.css";

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

  return (
    <div className={isDragging ? css.dragging : ""} ref={dragRef}>
      <Card
        style={{ width: 300 }}
        cover={project.url && <img alt={"no picture"} src={project.url} />}
        actions={[
          <RestOutlined key="trash" />,
          <ProfileOutlined key="show" />,
          <EditOutlined
            key="edit"
            onClick={() => navigate(`/board/project/${project.id}/edit`)}
          />,
        ]}
      >
        <Meta title={project.title} description={project.description} />
      </Card>
    </div>
  );
}
