import { Modal, Button } from "antd";
import React, { useState } from "react";
import { projectApi } from "../../hooks/projectApi";
import { Project } from "../../types/project";

interface Props {
  title: string;
  text: string;
  waitingText: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  project: Project;
}
export const ModalPopup = (props: Props) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>(props.text);
  const delteProject = () => {
    projectApi("DELETE", `/projects/${props.project.id}`, () =>
      console.log("deleted")
    );
  };

  const handleOk = () => {
    setModalText(props.waitingText);
    setConfirmLoading(true);
    setTimeout(() => {
      props.setVisible(false);
      setConfirmLoading(false);
      delteProject();
    }, 2000);
  };

  const handleCancel = () => {
    props.setVisible(false);
  };

  return (
    <>
      <Modal
        centered
        title={`${props.title} [${props.project.title}]`}
        visible={props.visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};
