import { Row, Button } from "antd";
import { useState } from "react";
import { ITask } from "../models/task";
import ModalTask from "./ModalTask";

interface TaskButtonsProps {
    task: ITask;
    setCurrentTask: (task: ITask) => void;
    changeTask: (task: ITask) => void;
    deleteTask: (task: ITask) => void;
    setIsModalOpen: (isModalOpen: boolean) => void;
}

const TaskButtons: React.FC<TaskButtonsProps> = ({
    task,
    setCurrentTask,
    changeTask,
    deleteTask,
    setIsModalOpen,
}) => {
    const onCloseTask = () => {
        changeTask({
            ...task,
            isClosed: true,
            isActive: false,
            isCompleted: true,
        });
    };

    const onDeleteTask = (task: ITask) => {
        deleteTask(task);
    };

    return (
        <Row>
            <Button
                onClick={() => onCloseTask()}
                style={{ color: "green" }}
                disabled={task.isClosed}
            >
                Принять исполнение
            </Button>

            <Button
                type="dashed"
                onClick={() => {
                    setCurrentTask(task);
                    setIsModalOpen(true);
                }}
                disabled={task.isClosed}
            >
                Корректировать
            </Button>

            <Button danger onClick={() => onDeleteTask(task)}>
                Удалить
            </Button>
        </Row>
    );
};

export default TaskButtons;
