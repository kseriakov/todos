import { useState } from "react";
import ModalUserForm from "../components/ModalUserForm";
import WorkerList from "../components/WorkerList";
import { useArray } from "../hooks/useArray";
import { IWorker } from "../models/worker";

const listWorkers: IWorker[] = [
    {
        id: 1,
        firstName: "User1",
        lastName: "Ivanov",
        email: "qwe@123.ru",
        birthdate: "12-12-2010",
        position:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae dolorum aliquid totam ipsum labore magni!",
    },
    {
        id: 2,
        firstName: "User2",
        lastName: "Petrov",
        email: "sdfe@123.ru",
        birthdate: "12-12-2013",
        position:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae dolorum aliquid totam ipsum labore magni!",
    },
    {
        id: 3,
        firstName: "User3",
        lastName: "Bird",
        email: "2rfffe@123.ru",
        birthdate: "12-12-2017",
        position:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae dolorum aliquid totam ipsum labore magni!",
    },
    {
        id: 4,
        firstName: "User4",
        lastName: "Bird",
        email: "2rfffe@123.ru",
        birthdate: "12-12-2018",
        position:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae dolorum aliquid totam ipsum labore magni!",
    },
];

const Workers: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const {
        data: workers,
        actionData: createWorker,
        deleteData: deleteWorker,
    } = useArray(listWorkers);

    setTimeout(() => {
        setLoading(false);
    }, 500);

    return (
        <div className="content__worker">
            <h1>Мои сотрудники</h1>
            <ModalUserForm createWorker={createWorker} />
            <WorkerList
                loading={loading}
                workers={workers}
                deleteWorker={deleteWorker}
            />
        </div>
    );
};

export default Workers;
