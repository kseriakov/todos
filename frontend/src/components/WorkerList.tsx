import { List, Button, Skeleton } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useArray } from "../hooks/useArray";
import { ITask } from "../models/task";
import { IWorker } from "../models/worker";
import { taskData } from "../pages/WorkerTasks";
import { RoutePath } from "../router/router";
import ModalTaskForm from "./ModalTaskForm";

interface WorkerListProps {
    loading: boolean;
    workers: IWorker[];
    deleteWorker: (worker: IWorker) => void;
}

const WorkerList: React.FC<WorkerListProps> = ({
    loading,
    workers,
    deleteWorker,
}) => {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
    const [currentTask, setCurrentTask] = useState<ITask>({} as ITask);

    const { actionData: createTask } = useArray(taskData);

    const navigate = useNavigate();

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
        <>
            <ModalTaskForm
                isModalOpen={isTaskModalOpen}
                setIsModalOpen={setIsTaskModalOpen}
                currentItem={currentTask}
                actionItem={createTask}
            />

            <List
                loading={loading}
                itemLayout="horizontal"
                // loadMore={loadMore}
                dataSource={workers}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button
                                key="all-taks"
                                className="content__worker-btn"
                                onClick={(e) =>
                                    navigate(`${RoutePath.TASKS}/${item.id}`)
                                }
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
                                onClick={() => deleteWorker(item)}
                            >
                                Удалить сотрудника
                            </Button>,
                        ]}
                    >
                        <Skeleton avatar title={false} loading={loading} active>
                            <List.Item.Meta
                                title={
                                    <Link to={`${RoutePath.TASKS}/${item.id}`}>
                                        {item.firstName} {item.lastName}
                                    </Link>
                                }
                                description={item.position}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
        </>
    );
};

export default WorkerList;
