export interface ITask {
    id: number;
    text: string;
    worker: string;
    workerId: number;
    date: string;
    isActive: boolean;
    isCompleted: boolean;
    isClosed: boolean;
}
