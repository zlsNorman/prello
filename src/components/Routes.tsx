import React from 'react'
import { Navigate, Route, Routes as RRDRoutes } from "react-router-dom";
import Board from './Board';
import ProjectForm from './ProjectForm';

export default function Routes() {
  return (
    <RRDRoutes>
      <Route path="/" element={<Navigate to={"/board"} />} />
      <Route path="/board" element={<Board />} />
      <Route path="/board/project/:projectId" />
      <Route path="/board/project/:projectId/edit" />
      <Route path="/board/project/new" element={<ProjectForm />} />
      <Route path="/settings" />
      <Route path="/statistic" />
    </RRDRoutes>
  )
}
