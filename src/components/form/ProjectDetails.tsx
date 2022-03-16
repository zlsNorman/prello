import { Divider, Row, Col } from "antd";
import React from "react";
import { useParams } from "react-router";
import { useProjectApi } from "../../hooks/projectApi";
import useIsMobile from "../../hooks/useIsMobile";
import { Project } from "../../types/project";
import LoadingSpinner from "../extra/LoadingSpinner";
import ProjectForm from "./ProjectForm";

export default function ProjectDetails() {
  const isMobile = useIsMobile();
  const { projectId } = useParams<{ projectId: string }>();
  const [project] = useProjectApi<Project>(`/projects/${projectId}`);
  if (!project) {
    return <LoadingSpinner />;
  }
  return (
    <ProjectForm
      title={project.title}
      //language obj to string
      language={project.language?.map((lang) => lang.title) || []}
      description={project.description}
      dateTo={project["range-date-picker"] && project["range-date-picker"][0]}
      dateFrom={project["range-date-picker"] && project["range-date-picker"][1]}
      author={project.author || ""}
      url={project.url || ""}
      status={project.status}
      id={project.id}
      isEdit={true}
      isDetails={true}
      pageTitle={"Project Details"}
    />
  );
}
