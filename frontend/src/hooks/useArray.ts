import { useState } from "react";

interface IData {
    id: number;
}

interface ReturnResult<T> {
    data: T[];
    actionData: (item: T) => void;
    deleteData: (item: T) => void;
}

export const useArray = <T extends IData>(data: T[]): ReturnResult<T> =>
    useItemArray(data);

const useItemArray = <T extends IData>(taskData: T[]): ReturnResult<T> => {
    const [data, setTasks] = useState<T[]>(taskData);

    const actionData = (item: T) => {
        if (item.id) {
            setTasks((tasks) =>
                tasks.map((t) => (item.id === t.id ? item : t))
            );
        } else {
            setTasks((tasks) => [...tasks, item]);
        }
    };

    const deleteData = (item: T) => {
        setTasks((data) => data.filter((t) => t.id !== item.id));
    };

    return {
        data,
        actionData,
        deleteData,
    };
};
