import { Layout, Menu } from "antd";
import { Header, Content } from "antd/lib/layout/layout";
import React, { useEffect, useMemo, useState } from "react";
import Routes from "./Routes";
import "../index.css";
import { ProjectOutlined } from "@ant-design/icons";
import { Link, NavLink, useLocation } from "react-router-dom";
import LoadingSpinner from "./extra/LoadingSpinner";
import Item from "antd/lib/list/Item";

export default function LayoutPrello() {
  const [selectedKey, setKey] = useState<string[]>();
  const location = useLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const items = useMemo(
    () => [
      { key: "1", label: "Board", path: "/board" },
      { key: "2", label: "createProject", path: "/board/project/new" },
    ],
    []
  );

  useEffect(() => {
    setKey([items.find((item) => location.pathname == item.path)?.key || "0"]);
  }, [items, location]);

  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" selectedKeys={selectedKey}>
          {items.map((item) => (
            <Menu.Item key={item.key}>
              <NavLink to={item.path}>{item.label}</NavLink>
            </Menu.Item>
          ))}
          <Menu.Item key="3">Settings</Menu.Item>
          <Menu.Item key="4">Statistic</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Content>
          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
}
