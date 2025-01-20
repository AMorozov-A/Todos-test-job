import { styled } from "styled-components"
import { FormEvent, useState } from "react"

interface TaskInputProps {
    onSubmit: (taskName: string) => void;
}

export const TaskInput = ({ onSubmit }: TaskInputProps) => {
    const [taskName, setTaskName] = useState("")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (taskName.trim()) {
            onSubmit(taskName)
            setTaskName("")
        }
    }

    return (
        <TaskInputForm data-testid='task-input-form' onSubmit={handleSubmit}>
            <TaskInputBox
                data-testid="task-input"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Task name"
            />
            <SubmitButton data-testid="add-task-button" type="submit">Add Task</SubmitButton>
        </TaskInputForm>
    )
}

const TaskInputForm = styled.form`
    display: flex;
    gap: 8px;
    width: 100%;
    margin-bottom: 16px;
    padding: 0 8px;
`

const TaskInputBox = styled.input`
    flex-grow: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`

const SubmitButton = styled.button`
    padding: 8px 16px;
    background-color: #0066cc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0052a3;
    }
`