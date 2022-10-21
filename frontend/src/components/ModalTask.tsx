import { Modal } from "antd";
import { RefObject, useRef, useState } from "react";
import { ITask } from "../models/task";
import ModalTaskForm from "./ModalTaskForm";

interface ModalTaskFormProps {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    actionTask: (task: ITask) => void;
    currentTask: ITask;
}

const ModalTask: React.FC<ModalTaskFormProps> = (props) => {
    const submitRef = useRef(null) as RefObject<HTMLButtonElement> | null;

    return (
        <div className="content__modal">
            <Modal
                title="Поручение"
                open={props.isModalOpen}
                onCancel={() => props.setIsModalOpen(false)}
                cancelText="Закрыть"
                okText="Применить"
                onOk={() => submitRef?.current?.click()}
            >
                <ModalTaskForm
                    submitRef={submitRef}
                    currentTask={props.currentTask as ITask}
                    actionTask={props.actionTask}
                    setIsModalOpen={props.setIsModalOpen}
                />
            </Modal>
        </div>
    );
};

export default ModalTask;
