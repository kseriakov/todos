import { Button } from "antd";
import { useState } from "react";
import ModalTaskForm from "../components/ModalTaskForm";
import TaskList from "../components/TaskList";
import { ITask } from "../models/task";

const AllTasks: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentTask, setCurrentTask] = useState<ITask>({} as ITask);

    return (
        <div className="content__main">
            <div className="content__create">
                <ModalTaskForm
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    currentTask={{} as ITask}
                />
                <Button type="dashed" onClick={() => setIsModalOpen(true)}>
                    Добавить поручение
                </Button>
            </div>
            <TaskList
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
            />
        </div>
    );
};

export default AllTasks;
