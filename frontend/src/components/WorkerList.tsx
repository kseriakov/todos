import { List, Button, Skeleton } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ITask } from "../models/task";
import { IUser } from "../models/user";
import { RoutePath } from "../router/router";
import { workerAPI } from "../services/workerAPI";
import ModalTaskForm from "./ModalTaskForm";

const WorkerList: React.FC = () => {
    const { data: workers, isLoading } = workerAPI.useGetMyWorkersQuery();
    const [deleteWorker, {}] = workerAPI.useDeleteWorkerMutation();

    const navigate = useNavigate();

    const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
    const [currentTask, setCurrentTask] = useState<ITask>({} as ITask);
    const [workerSelected, setWorkerSelected] = useState<IUser | null>(null);

    const onCreateTask = (worker: IUser) => {
        const workerAPI = workers?.find((w) => w.id === worker.id);
        if (workerAPI) {
            setCurrentTask((currentTask) => ({
                ...currentTask,
                worker: workerAPI.firstName,
            }));
        }
        setWorkerSelected(worker);

        setIsTaskModalOpen(true);
    };

    return (
        <>
            <ModalTaskForm
                isModalOpen={isTaskModalOpen}
                setIsModalOpen={setIsTaskModalOpen}
                currentTask={currentTask}
                workerSelected={workerSelected}
            />

            <List
                loading={isLoading}
                itemLayout="horizontal"
                dataSource={workers}
                renderItem={(wrk) => (
                    <List.Item
                        actions={[
                            <Button
                                key="all-taks"
                                className="content__worker-btn"
                                onClick={(e) =>
                                    navigate(
                                        `${RoutePath.WORKER_TASKS}/${wrk.id}`,
                                        {
                                            state: {
                                                workerFirstName: wrk.firstName,
                                                workerLastName: wrk.lastName,
                                                workerPosition: wrk.position,
                                            },
                                        }
                                    )
                                }
                            >
                                Все поручения
                            </Button>,
                            <Button
                                key="new-taks"
                                className="content__worker-btn"
                                onClick={() => onCreateTask(wrk)}
                                style={{ color: "green" }}
                            >
                                Новое
                            </Button>,
                            <Button
                                className="content__worker-delete content__worker-btn"
                                key="delete-worker"
                                onClick={() => deleteWorker(wrk.id)}
                            >
                                Удалить сотрудника
                            </Button>,
                        ]}
                    >
                        <Skeleton
                            avatar
                            title={false}
                            loading={isLoading}
                            active
                        >
                            <List.Item.Meta
                                title={
                                    <Link
                                        to={`${RoutePath.WORKER_TASKS}/${wrk.id}`}
                                        state={{
                                            workerFirstName: wrk.firstName,
                                            workerLastName: wrk.lastName,
                                            workerPosition: wrk.position,
                                        }}
                                    >
                                        {wrk.firstName} {wrk.lastName}
                                    </Link>
                                }
                                description={wrk.position}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
        </>
    );
};

export default WorkerList;
