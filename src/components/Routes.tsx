import React from 'react'
import { Navigate, Route, Routes as RRDRoutes } from "react-router-dom";
import Board from './Board';

export default function Routes() {
  return (
    <RRDRoutes>
      <Route path="/" element={<Navigate to={"/board"} />} />
      <Route path="/board" element={<Board />} />
      <Route path="/board/:projectId" />
      <Route path="/settings" />
      <Route path="/infos" />
    </RRDRoutes>
  )
}
