import { Button, Collapse, Modal, Pagination, Row } from "antd";
import { useState } from "react";
import ModalTask from "../components/ModalTask";
import ModalTaskCreate from "../components/ModalTaskCreate";
import TaskList from "../components/TaskList";
import { ITask } from "../models/task";
import { taskData } from "./Tasks";



const Main: React.FC = () => {
    return (
        <div className="content__main">
            <ModalTaskCreate />
            <TaskList />
            <div className="content__pagination">
                <Pagination
                    onChange={(e) => console.log(e)}
                    pageSize={5}
                    total={15}
                    responsive={true}
                />
            </div>
        </div>
    );
};

export default Main;
