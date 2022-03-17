import React, { useState } from "react";
import { projectApi, useProjectApi } from "../hooks/projectApi";
import css from "../style/board.module.css";
import { Language, Status } from "../types/project";
import { Button, Divider, Table } from "antd";
import { ModalPopup } from "./extra/ModalPopup";
import LoadingSpinner from "./extra/LoadingSpinner";
import { Navigate, useNavigate } from "react-router";

export default function Settings() {
  const [visibleStatus, setVisibleStatus] = useState<boolean>(false);
  const [visibleLanguage, setVisibleLanguage] = useState<boolean>(false);
  const [stati, setStati] = useProjectApi<Status[]>("/status");
  const [languages, setLanguages] = useProjectApi<Language[]>("/languages");
  const [selectedStatus, setSelectedStatus] = useState<Status>();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>();
  const navigate = useNavigate();

  const showModal = (
    id: string,
    el: Status | Language,
    setter: React.Dispatch<React.SetStateAction<any | undefined>>,
    isStatus: boolean
  ) => {
    setter(el);
    isStatus ? setVisibleStatus(true) : setVisibleLanguage(true);
  };

  if (!stati) {
    <LoadingSpinner />;
  }

  const deleteFromDb = (selectedRow: Status | Language, isStatus: boolean) => {
    console.log(selectedRow.id);
    selectedRow && isStatus
      ? projectApi("DELETE", `/status/${selectedRow.id}`, () =>
          setStati(stati && stati.filter((el) => el.id !== selectedRow.id))
        )
      : projectApi("DELETE", `/languages/${selectedRow.id}`, () =>
          setLanguages(
            languages && languages.filter((el) => el.id !== selectedRow.id)
          )
        );
  };

  const columnsStatus = [
    { title: "id", dataIndex: "id", key: "id" },
    { title: "status", dataIndex: "status", key: "status" },
    {
      title: "backgroundColor",
      dataIndex: "backgroundColor",
      key: "backgroundColor",
      editable: true,
    },
    {
      title: "Delete",
      dataIndex: "id",
      key: "x",
      render: (id: string, status: Status) => (
        <a
          key={status.id}
          onClick={(el) => showModal(id, status, setSelectedStatus, true)}
        >
          X
        </a>
      ),
    },
  ];

  const columnsLanguage = [
    { title: "id", dataIndex: "id", key: "id" },
    { title: "title", dataIndex: "title", key: "title" },
    {
      title: "backgroundColor",
      dataIndex: "backgroundColor",
      key: "backgroundColor",
      editable: true,
    },
    {
      title: "Delete",
      dataIndex: "id",
      key: "x",
      render: (id: string, language: Language) => (
        <a
          key={language.id}
          onClick={(el) => showModal(id, language, setSelectedLanguage, false)}
        >
          X
        </a>
      ),
    },
  ];

  return (
    <div className={css.settings}>
      <div key="status">
        <Divider>Status</Divider>
        <Button onClick={() => navigate("/settings/status/new")} type="primary">
          create Status
        </Button>
        {selectedStatus && (
          <ModalPopup
            action={() => deleteFromDb(selectedStatus, true)}
            title={"Delte Status"}
            text={"do you wanna Delete this Status"}
            waitingText={"only seconds until the delete is done..."}
            visible={visibleStatus}
            setVisible={setVisibleStatus}
            status={selectedStatus}
          ></ModalPopup>
        )}
        <Table pagination={false} columns={columnsStatus} dataSource={stati} />
      </div>

      <div key="language">
        <Divider>Script-Languages</Divider>
        <Button
          onClick={() => navigate("/settings/language/new")}
          type="primary"
        >
          create Language
        </Button>
        <ModalPopup
          action={() =>
            selectedLanguage && deleteFromDb(selectedLanguage, false)
          }
          title={"Delte Status"}
          text={"do you wanna Delete this Script-Language"}
          waitingText={"only seconds until the delete is done..."}
          visible={visibleLanguage}
          setVisible={setVisibleLanguage}
          language={selectedLanguage}
        ></ModalPopup>
        <Table
          pagination={false}
          columns={columnsLanguage}
          dataSource={languages}
        />
      </div>
    </div>
  );
}
