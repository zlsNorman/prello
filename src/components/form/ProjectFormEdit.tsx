import React, { memo } from "react";
import { useParams } from "react-router-dom";
import { useProjectApi } from "../../hooks/projectApi";
import { Project } from "../../types/project";
import LoadingSpinner from "../extra/LoadingSpinner";
import ProjectForm from "./ProjectForm";

export default function ProjectFormEdit() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project] = useProjectApi<Project>(`/projects/${projectId}`);
  console.log(project);

  if (!project) {
    return <LoadingSpinner />;
  }

  return (
    <ProjectForm
      title={project.title}
      language={project.language || []}
      description={project.description}
      dateTo={project.dateTo}
      dateFrom={project.dateFrom}
      author={project.author || ""}
      url={project.url || ""}
      status={project.status}
      id={project.id}
      isEdit={true}
    />
  );
}
