import { Modal } from "antd";
import React, { useState } from "react";
import { projectApi } from "../../hooks/projectApi";
import { Language, Project, Status } from "../../types/project";
import { useBoardContext } from "../ProjectProvider";

interface Props {
  title: string;
  text: string;
  waitingText: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  project?: Project;
  status?: Status;
  language?: Language;
  action: () => void;
}
export const ModalPopup = (props: Props) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>(props.text);

  const handleOk = () => {
    setModalText(props.waitingText);
    setConfirmLoading(true);
    setTimeout(() => {
      props.setVisible(false);
      setConfirmLoading(false);
      props.action();
    }, 2000);
  };

  const handleCancel = () => {
    props.setVisible(false);
  };

  return (
    <>
      <Modal
        centered
        title={`${props.title} [${
          props.project
            ? props.project.title
            : props.status
            ? props.status.status
            : props.language
            ? props.language.title
            : ""
        }]`}
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
