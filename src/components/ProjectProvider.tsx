import React, {
  createContext,
  ReactElement,
  useContext,
  useReducer,
} from "react";
import { useProjectApi } from "../hooks/projectApi";
import { Project } from "../types/project";
import LoadingSpinner from "./extra/LoadingSpinner";

//GGF auf use reducer ausweiten müsste dadurch aber ProjectApi anstatt useProjectApi nutzen

export interface ProjectContext {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[] | undefined>>;
}

const ProjectContext = createContext({} as ProjectContext);

export const useBoardContext = (): ProjectContext => useContext(ProjectContext);

export default function ProjectProvider(props: {
  children: ReactElement;
}): ReactElement {
  const [projects, setProjects] = useProjectApi<Project[]>("/projects/");

  if (!projects) {
    return <LoadingSpinner />;
  }

  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {props.children}
    </ProjectContext.Provider>
  );
}
