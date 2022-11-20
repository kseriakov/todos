import ModalUserForm from "../components/ModalUserForm";
import WorkerList from "../components/WorkerList";

const Workers: React.FC = () => {
    return (
        <div className="content__worker">
            <h1>Мои сотрудники</h1>
            <ModalUserForm />
            <WorkerList />
        </div>
    );
};

export default Workers;
