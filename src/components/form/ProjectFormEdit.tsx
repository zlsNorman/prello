import React, { memo } from "react";
import { useParams } from "react-router-dom";
import { useProjectApi } from "../../hooks/projectApi";
import { Project } from "../../types/project";
import LoadingSpinner from "../extra/LoadingSpinner";
import ProjectForm from "./ProjectForm";

export default function ProjectFormEdit() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = useProjectApi<Project>(`/projects/${projectId}`)[0];
  console.log(project);

  if (!project) {
    <LoadingSpinner />;
  }

  return (
    <ProjectForm
      title={"project.title"}
      language={[]}
      description={""}
      dateTo={new Date()}
      dateFrom={new Date()}
      author={""}
      url={""}
    />
  );
}
