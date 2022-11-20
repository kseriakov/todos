import { Collapse, Skeleton } from "antd";
import { useState } from "react";

import { ITask } from "../models/task";
import TaskButtons from "./TaskButtons";
import ModalTaskForm from "./ModalTaskForm";
import { taskAPI } from "../services/taskAPI";
import { reverseDate } from "../utils/reverseDateData";
import { LoadMore } from "./LoadMore";

const { Panel } = Collapse;

interface TaskListProps {
    currentTask: ITask;
    setCurrentTask: (task: ITask) => void;
}

const TaskList: React.FC<TaskListProps> = ({ currentTask, setCurrentTask }) => {
    const [limitPage, setLimitPage] = useState<number>(5);
    const {
        data: tasksResponse,
        isLoading,
        isFetching,
    } = taskAPI.useGetChiefTasksQuery({
        limit: limitPage,
    });

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [taskIdClosed, setTaskIdClosed] = useState<number | null>(null);

    const onLoad = () => {
        setLimitPage((limitPage) => limitPage + 5);
    };

    return (
        <>
            <ModalTaskForm
                currentTask={currentTask}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
            <Skeleton loading={isLoading}>
                <Collapse bordered={false}>
                    {tasksResponse?.results?.map((task, i) => (
                        <Panel
                            className={`content__panel ${
                                task.id === taskIdClosed ? "remove" : ""
                            }`}
                            key={i}
                            header={
                                <GetTaskHeader
                                    worker={task.worker}
                                    date={reverseDate(task.date)}
                                    isCompleted={task.isCompleted}
                                />
                            }
                        >
                            <p style={{ paddingLeft: 24 }}>{task.text}</p>
                            <TaskButtons
                                task={task}
                                setIdForCloseStyle={(id: number) =>
                                    setTaskIdClosed(id)
                                }
                                setIsModalOpen={setIsModalOpen}
                                setCurrentTask={setCurrentTask}
                            />
                        </Panel>
                    ))}
                </Collapse>
                <LoadMore
                    isLoading={isLoading || isFetching}
                    isMore={tasksResponse?.next !== null}
                    handlerAction={() => onLoad()}
                />
            </Skeleton>
        </>
    );
};

const GetTaskHeader: React.FC<{
    worker: string;
    date: string;
    isCompleted: boolean;
}> = ({ worker, date, isCompleted }) => {
    return (
        <>
            <p>
                <b>{worker}</b>
            </p>
            <p>Срок: {date}</p>
            {isCompleted ? <p style={{ color: "green" }}>Выполнено</p> : null}
        </>
    );
};

export default TaskList;
