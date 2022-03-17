/* eslint-disable indent */
import { Space, Divider } from "antd";
import React from "react";
import { Project, StatusType } from "../types/project";

import { useDrop } from "react-dnd";
import Cards from "./Cards";
import { projectApi } from "../hooks/projectApi";
import { useBoardContext } from "./ProjectProvider";

interface Props {
  status: StatusType;
  statusColor?: string;
}

export default function BoardColumns({ status, statusColor }: Props) {
  const { projects, setProjects } = useBoardContext();

  const [{ isOver }, dropRef] = useDrop({
    accept: "card",
    drop: (item: any) =>
      item.project.status !== status
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
