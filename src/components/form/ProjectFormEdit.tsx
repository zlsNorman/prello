import React, { memo } from "react";
import { useParams } from "react-router-dom";
import { useProjectApi } from "../../hooks/projectApi";
import { Project } from "../../types/project";
import LoadingSpinner from "../extra/LoadingSpinner";
import ProjectForm from "./ProjectForm";

export default function ProjectFormEdit() {
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
      pageTitle={"Edit Project"}
    />
  );
}
