/* eslint-disable indent */
import { Space, Card, Divider } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useState } from "react";
import { Project, StatusType } from "../types/project";

import { useDrag, useDrop } from "react-dnd";
import Cards from "./Cards";
import { projectApi } from "../hooks/projectApi";

interface Props {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[] | undefined>>;
  status: StatusType;
  statusColor?: string;
}

/* setProjects([...projects, { ...item.project, status: status }]) */
export default function BoardColumns({
  projects,
  status,
  setProjects,
  statusColor,
}: Props) {
  const [{ isOver }, dropRef] = useDrop({
    accept: "card",
    drop: (item: any) =>
      item.project.status != status
        ? projectApi(
            "PATCH",
            `/projects/${item.project.id}`,
            () => {
              setProjects(
                [
                  ...projects.filter(
                    (project) => project.id !== item.project.id
                  ),
                  { ...item.project, status: status },
                ].sort((a: Project, b: Project) =>
                  a.title > b.title ? 1 : b.title > a.title ? -1 : 0
                )
              );
            },
            { status: status }
          )
        : {},
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      style={
        statusColor
          ? { backgroundColor: statusColor }
          : { backgroundColor: "grey" }
      }
      id={status}
      ref={dropRef}
    >
      <Divider>{status.toUpperCase()}</Divider>
      <Space direction="vertical" style={{ width: "100%" }}>
        {projects
          .sort((a: Project, b: Project) =>
            a.title > b.title ? 1 : b.title > a.title ? -1 : 0
          )
          .filter((project) => project.status == status)
          .map((project) => {
            return <Cards key={project.id} project={project} />;
          })}
      </Space>
    </div>
  );
}
