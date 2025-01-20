export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'canceled';

export interface Task {
    id: string;
    name: string;
    description: string;
    status: TaskStatus;
}

export type TaskList = Task[];