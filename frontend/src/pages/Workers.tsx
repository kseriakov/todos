import { Button, List, Skeleton } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalTask from "../components/ModalTask";
import ModalTaskCreate from "../components/ModalTaskCreate";
import { useArray } from "../hooks/useArray";
import { ITask } from "../models/task";
import { IWorker } from "../models/worker";
import { RoutePath } from "../router/router";
import { taskData } from "./Tasks";

const listWorkers: IWorker[] = [
    {
        id: 1,
        firstName: "User1",
        lastName: "Ivanov",
        email: "qwe@123.ru",
    },
    {
        id: 2,
        firstName: "User2",
        lastName: "Petrov",
        email: "sdfe@123.ru",
    },
    {
        id: 3,
        firstName: "User3",
        lastName: "Bird",
        email: "2rfffe@123.ru",
    },
    {
        id: 4,
        firstName: "User4",
        lastName: "Bird",
        email: "2rfffe@123.ru",
    },
];

const Workers: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
    const [isWorkerModalOpen, setIsWorkerModalOpen] = useState<boolean>(false);
    const [currentTask, setCurrentTask] = useState<ITask>({} as ITask);

    const {
        data: workers,
        actionData: createWorker,
        deleteData: deleteWorker,
    } = useArray(listWorkers);

    const {
        data: tasks,
        actionData: createTask,
        deleteData: deleteTask,
    } = useArray(taskData);

    const navigate = useNavigate();

    setTimeout(() => {
        setLoading(false);
    }, 500);

    const onCreateTask = (workerId: number) => {
        const worker = workers.find((w) => w.id === workerId);
        if (worker) {
            setCurrentTask((currentTask) => ({
                ...currentTask,
                worker: worker.firstName,
            }));
        }

        setIsTaskModalOpen(true);
    };

    return (
        <div className="content__worker">
            <ModalTask
                isModalOpen={isWorkerModalOpen}
                setIsModalOpen={setIsWorkerModalOpen}
                currentTask={currentTask}
                actionTask={createTask}
            />
            <ModalTask
                isModalOpen={isTaskModalOpen}
                setIsModalOpen={setIsTaskModalOpen}
                currentTask={currentTask}
                actionTask={createTask}
            />
            <h1>Мои сотрудники</h1>
            <List
                loading={loading}
                itemLayout="horizontal"
                // loadMore={loadMore}
                dataSource={listWorkers}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button
                                key="all-taks"
                                className="content__worker-btn"
                                onClick={(e) => navigate(RoutePath.TASKS)}
                            >
                                Все поручения
                            </Button>,
                            <Button
                                key="new-taks"
                                className="content__worker-btn"
                                onClick={() => onCreateTask(item.id)}
                                style={{ color: "green" }}
                            >
                                Новое
                            </Button>,
                            <Button
                                className="content__worker-delete content__worker-btn"
                                key="delete-worker"
                            >
                                Удалить сотрудника
                            </Button>,
                        ]}
                    >
                        <Skeleton avatar title={false} loading={loading} active>
                            <List.Item.Meta
                                title={
                                    <a href="https://ant.design">
                                        {item.firstName}
                                    </a>
                                }
                                description={
                                    "Ant Design, a design language for background applications, is refined by Ant UED Team"
                                }
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Workers;
