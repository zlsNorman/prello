import { Layout } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import LayoutPrello from "./components/LayoutPrello";
import ProjectProvider from "./components/ProjectProvider";
import Routes from "./components/Routes";

function App() {
  return (
    <BrowserRouter>
      <ProjectProvider>
        <LayoutPrello />
      </ProjectProvider>
    </BrowserRouter>
  );
}

export default App;
