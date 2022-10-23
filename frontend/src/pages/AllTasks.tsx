import { Button, Pagination } from "antd";
import { useState } from "react";
import ModalTaskForm from "../components/ModalTaskForm";
import TaskList from "../components/TaskList";
import { useArray } from "../hooks/useArray";
import { ITask } from "../models/task";
import { taskData } from "./WorkerTasks";

const AllTasks: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { data: tasks, actionData, deleteData } = useArray(taskData);
    const [currentTask, setCurrentTask] = useState<ITask>({} as ITask);

    return (
        <div className="content__main">
            <div className="content__create">
                <ModalTaskForm
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    currentItem={{} as ITask}
                    actionItem={actionData}
                />
                <Button type="dashed" onClick={() => setIsModalOpen(true)}>
                    Добавить поручение
                </Button>
            </div>
            <TaskList
                tasks={tasks}
                changeTask={actionData}
                deleteTask={deleteData}
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
            />
            <div className="content__pagination">
                <Pagination
                    onChange={(e) => console.log(e)}
                    pageSize={5}
                    total={15}
                    responsive={true}
                />
            </div>
        </div>
    );
};

export default AllTasks;
