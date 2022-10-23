import { List, Skeleton } from "antd";
import { useMemo, useState } from "react";
import React from "react";

import TaskButtons from "../components/TaskButtons";
import { ITask } from "../models/task";
import { TaskStatus } from "../enums/task";
import { useArray } from "../hooks/useArray";
import ModalTaskForm from "../components/ModalTaskForm";
import { useParams } from "react-router-dom";
import { UserRole } from "../enums/navbar";
import { role } from "../components/AppRoutes";

export const taskData: ITask[] = [
    {
        id: 1,
        worker: "User1",
        workerId: "1",
        text: "A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many householdsacross the world.",
        date: "20-10-2022",
        isCompleted: false,
        isActive: true,
        isClosed: false,
    },
    {
        id: 2,
        worker: "User2",
        workerId: "2",
        text: "A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many householdsacross the world.",
        date: "21-10-2022",
        isCompleted: false,
        isActive: true,
        isClosed: false,
    },
    {
        id: 3,
        worker: "User3",
        workerId: "3",
        text: "A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many householdsacross the world.",
        date: "22-10-2022",
        isCompleted: false,
        isActive: true,
        isClosed: false,
    },
    {
        id: 4,
        worker: "User4",
        workerId: "4",
        text: "A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many householdsacross the world.",
        date: "23-10-2022",
        isCompleted: true,
        isActive: false,
        isClosed: false,
    },
];

const WorkerTasks: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentTask, setCurrentTask] = useState<ITask>({} as ITask);

    const {
        data: tasks,
        actionData: changeTask,
        deleteData: deleteTask,
    } = useArray(taskData);

    let id = "1"; // будем получать для пользователя
    const params = useParams();
    const workerId = params.id ?? id;

    const workerTasks = useMemo(
        () => tasks.filter((item) => item.workerId === workerId),
        [tasks]
    );

    setTimeout(() => {
        setLoading(false);
    }, 500);

    return (
        <div className="content__tasks">
            {role === (UserRole.CHIEF as UserRole) ? (
                <ModalTaskForm
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    currentItem={currentTask}
                    actionItem={changeTask}
                />
            ) : null}

            <h1>User1</h1>
            <List
                loading={loading}
                itemLayout="horizontal"
                // loadMore={loadMore}
                dataSource={workerTasks}
                renderItem={(item) => (
                    <List.Item>
                        <Skeleton avatar title={false} loading={loading} active>
                            <List.Item.Meta
                                title={
                                    <div className="content__task-title">
                                        <TasksStatusText task={item} />
                                        {item.date}
                                    </div>
                                }
                                description={
                                    <p
                                        className={`content__task-description ${
                                            item.isClosed
                                                ? "content__task-complete"
                                                : ""
                                        }`}
                                    >
                                        {item.text}
                                    </p>
                                }
                            />
                        </Skeleton>
                        <TaskButtons
                            task={item}
                            changeTask={changeTask}
                            deleteTask={deleteTask}
                            setIsModalOpen={setIsModalOpen}
                            setCurrentTask={setCurrentTask}
                        />
                    </List.Item>
                )}
            />
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
