import { Row, Button } from "antd";
import { UserRole } from "../enums/navbar";
import { useAppSelector } from "../hooks/useAppSelector";
import { ITask } from "../models/task";
import { taskAPI } from "../services/taskAPI";

interface TaskButtonsProps {
    task: ITask;
    setCurrentTask: (task: ITask) => void;
    setIdForCloseStyle?: (id: number) => void;
    setIsModalOpen: (isModalOpen: boolean) => void;
}

const TaskButtons: React.FC<TaskButtonsProps> = ({
    task,
    setCurrentTask,
    setIdForCloseStyle,
    setIsModalOpen,
}) => {
    const { isChief } = useAppSelector(({ auth }) => auth);

    const [updateTask, { isLoading: loadingUpdate }] =
        taskAPI.useChangeTaskMutation();
    const [deleteTask, { isLoading: loadingDelete }] =
        taskAPI.useDeleteTaskMutation();
    const [completeTask, { isLoading: loadingComplete }] =
        taskAPI.useCompleteTaskMutation();

    const onCloseTask = () => {
        setIdForCloseStyle && setIdForCloseStyle(task.id);
        setTimeout(
            () =>
                updateTask({
                    id: task.id,
                    is_active: false,
                    is_completed: true,
                    is_closed: true,
                }),
            700
        );
    };

    return (
        <Row>
            {isChief ? (
                <>
                    <Button
                        onClick={() => onCloseTask()}
                        style={{ color: "green" }}
                        disabled={task.isClosed}
                        loading={loadingUpdate}
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

                    <Button
                        danger
                        onClick={() => deleteTask(task.id)}
                        loading={loadingDelete}
                    >
                        Удалить
                    </Button>
                </>
            ) : (
                <Button
                    style={{ color: "green" }}
                    onClick={() =>
                        completeTask({ id: task.id, is_completed: true })
                    }
                    loading={loadingComplete}
                >
                    Выполнено
                </Button>
            )}
        </Row>
    );
};

export default TaskButtons;
