import React, { useState } from "react";
import { useProjectApi } from "../hooks/projectApi";
import { Project, Status, StatusType } from "../types/project";
import LoadingSpinner from "./extra/LoadingSpinner";

import css from "../style/board.module.css";
import BoardColumns from "./BoardColumns";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useBoardContext } from "./ProjectProvider";

export default function Board() {
  const { projects } = useBoardContext();

  const [status] = useProjectApi<Status[]>("/status");

  if (!projects || !status) {
    return <LoadingSpinner />;
  }
  return (
    <div className={css.board}>
      <DndProvider backend={HTML5Backend}>
        {status.map(({ status, backgroundColor }) => (
          <BoardColumns
            key={status}
            status={status}
            statusColor={backgroundColor}
          />
        ))}
      </DndProvider>
    </div>
  );
}
