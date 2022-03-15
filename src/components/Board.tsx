import React, { useState } from "react";
import { useProjectApi } from "../hooks/projectApi";
import { Project, Status, StatusType } from "../types/project";
import LoadingSpinner from "./extra/LoadingSpinner";

import css from "../style/board.module.css";
import BoardColumns from "./BoardColumns";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Board() {
  const [projects, setProjects] = useProjectApi<Project[]>("/projects/");
  const [types] = useProjectApi<Status[]>("/status");
  //const types: StatusType[] = ["onhold", "ongoing", "finished"];

  if (!projects || !types) {
    return <LoadingSpinner />;
  }
  return (
    <div className={css.board}>
      <DndProvider backend={HTML5Backend}>
        {types.map(({ status, backgroundColor }) => (
          <BoardColumns
            key={status}
            projects={projects}
            status={status}
            setProjects={setProjects}
            statusColor={backgroundColor}
          />
        ))}
      </DndProvider>
    </div>
  );
}
