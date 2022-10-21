import { Button } from "antd";
import { useState } from "react";
import { useArray } from "../hooks/useArray";
import { ITask } from "../models/task";
import { taskData } from "../pages/Tasks";
import ModalTask from "./ModalTask";

const ModalTaskCreate: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { data: tasks, actionData: createTask } = useArray(taskData);
    const [currentTask, _] = useState<ITask>({} as ITask);
    console.log(tasks);
    return (
        <div className="content__create">
            <ModalTask
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                currentTask={currentTask}
                actionTask={createTask}
            />
            <Button type="dashed" onClick={() => setIsModalOpen(true)}>
                Добавить поручение
            </Button>
        </div>
    );
};

export default ModalTaskCreate;
