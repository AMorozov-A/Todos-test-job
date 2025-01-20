import { styled } from "styled-components"
import { Task } from "../Task/Task"
import { TaskList, TaskStatus } from "../../types/todoType"

interface TableTodosProps {
    tasks: TaskList;
    onRemove: (id: string) => void;
    onRename: (id: string) => void;
    onStatusChange: (id: string, status: TaskStatus) => void;
    onOpenDetails: (id: string) => void;
}

export const TableTodos = ({ 
    tasks, 
    onRemove, 
    onRename, 
    onStatusChange, 
    onOpenDetails
}: TableTodosProps) => {

    return (
        <TableTodosBox>
            {tasks.map((task) => (
                <Task 
                    key={task.id} 
                    {...task} 
                    onRemove={onRemove} 
                    onRename={onRename}
                    onStatusChange={onStatusChange}
                    onOpenDetails={onOpenDetails}
                />
            ))}
        </TableTodosBox>
    )
}

const TableTodosBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16px;
`