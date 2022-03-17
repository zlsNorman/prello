import React from "react";
import { Navigate, Route, Routes as RRDRoutes } from "react-router-dom";
import Board from "./Board";
import ProjectFormAdd from "./form/ProjectFormAdd";
import ProjectFormEdit from "./form/ProjectFormEdit";
import ProjectDetails from "./form/ProjectDetails";
import Settings from "./Settings";
import StatusForm from "./form/StatusForm";
import LanguageForm from "./form/LanguageForm";

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
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/status/new" element={<StatusForm />} />
      <Route path="/settings/language/new" element={<LanguageForm />} />
      <Route path="/statistic" />
    </RRDRoutes>
  );
}
