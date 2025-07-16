import { TaskItem } from "./task-item.model";

export interface TaskList {
    id: string | null;
    title: string;
    description: string;
}