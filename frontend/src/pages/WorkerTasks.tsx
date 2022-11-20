import { List, Skeleton } from "antd";
import { useMemo, useState } from "react";
import React from "react";

import TaskButtons from "../components/TaskButtons";
import { ITask } from "../models/task";
import { TaskStatus } from "../enums/task";
import ModalTaskForm from "../components/ModalTaskForm";
import { useAppSelector } from "../hooks/useAppSelector";
import { taskAPI } from "../services/taskAPI";
import { LoadMore } from "../components/LoadMore";
import { reverseDate } from "../utils/reverseDateData";
import { useLocation, useParams } from "react-router-dom";

interface WorkerTasksProps {
    workerId?: number | null;
}

interface WorkerLocation {
    state: {
        workerFirstName: string | null;
        workerLastName: string | null;
        workerPosition: string | null;
    } | null;
}

const WorkerTasks: React.FC<WorkerTasksProps> = ({ workerId }) => {
    const { id } = useParams<{ id: string }>();

    const { state } = useLocation() as WorkerLocation;

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentTask, setCurrentTask] = useState<ITask>({} as ITask);

    const { isChief, firstName, lastName, position } = useAppSelector(
        ({ auth }) => auth
    );

    const [limitPage, setLimitPage] = useState<number>(5);

    const {
        data: taskResponse,
        isFetching,
        isLoading,
    } = taskAPI.useGetWorkerTasksQuery({
        limit: limitPage,
        id: workerId || id,
    });

    const onLoad = () => {
        setLimitPage((limitPage) => limitPage + 5);
    };

    return (
        <div className="content__tasks">
            {isChief ? (
                <ModalTaskForm
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    currentTask={currentTask}
                />
            ) : null}

            <h1>
                {state
                    ? `${state.workerFirstName} ${
                          state.workerLastName
                      }, ${state.workerPosition?.toLowerCase()}`
                    : null}
            </h1>
            <Skeleton active paragraph loading={isLoading}>
                <List
                    itemLayout="horizontal"
                    loadMore={
                        <LoadMore
                            isLoading={!isLoading && isFetching}
                            isMore={taskResponse?.next !== null}
                            handlerAction={() => onLoad()}
                        />
                    }
                    dataSource={taskResponse?.results}
                    renderItem={(task) => (
                        <List.Item>
                            <List.Item.Meta
                                title={
                                    <div className="content__task-title">
                                        <TasksStatusText task={task} />
                                        {reverseDate(task.date)}
                                    </div>
                                }
                                description={
                                    <p
                                        className={`content__task-description ${
                                            task.isClosed
                                                ? "content__task-complete"
                                                : ""
                                        }`}
                                    >
                                        {task.text}
                                    </p>
                                }
                            />

                            <TaskButtons
                                task={task}
                                setIsModalOpen={setIsModalOpen}
                                setCurrentTask={setCurrentTask}
                            />
                        </List.Item>
                    )}
                />
            </Skeleton>
        </div>
    );
};

const TasksStatusText: React.FC<{ task: ITask }> = ({ task }) => {
    const status = task.isClosed
        ? TaskStatus.CLOSED
        : task.isCompleted
        ? TaskStatus.COMPLETED
        : TaskStatus.ACTIVE;

    const statusClass = task.isClosed
        ? "closed"
        : task.isCompleted
        ? "completed"
        : "active";

    return <p className={`content__task-status ${statusClass}`}>{status}</p>;
};

export default WorkerTasks;
