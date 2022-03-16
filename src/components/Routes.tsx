import React from "react";
import { Navigate, Route, Routes as RRDRoutes } from "react-router-dom";
import Board from "./Board";
import ProjectForm from "./form/ProjectForm";
import ProjectFormAdd from "./form/ProjectFormAdd";
import ProjectFormEdit from "./form/ProjectFormEdit";
import ProjectDetails from "./form/ProjectDetails";

export default function Routes() {
  return (
    <RRDRoutes>
      <Route path="/" element={<Navigate to={"/board"} />} />
      <Route path="/board" element={<Board />} />
      <Route path="/board/project/:projectId" element={<ProjectDetails />} />
      <Route
        path="/board/project/:projectId/edit"
        element={<ProjectFormEdit />}
      />
      <Route path="/board/project/new" element={<ProjectFormAdd />} />
      <Route path="/settings" />
      <Route path="/statistic" />
    </RRDRoutes>
  );
}
