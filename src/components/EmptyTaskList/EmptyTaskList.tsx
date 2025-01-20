import styled from "styled-components"
import AddNewTaskIcon from '../../assets/icons/AddNewTaskIcon.svg?react'

interface EmptyTaskListProps {
    onCreateClick: () => void;
}

export const EmptyTaskList = ({ onCreateClick }: EmptyTaskListProps) => {
    return (
        <EmptyTaskListBox data-testid="empty-task-list-box">
            <EmptyIcon>📝</EmptyIcon>
            <Title>Список задач пуст</Title>
            <Description>
                Создайте свою первую задачу
            </Description>
            <CreateButton data-testid="empty-task-list-create" onClick={onCreateClick}>
                <AddNewTaskIcon />
                Создать задачу
            </CreateButton>
        </EmptyTaskListBox>
    )
}

const EmptyTaskListBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    text-align: center;
`

const EmptyIcon = styled.div`
    font-size: 48px;
    margin-bottom: 16px;
`

const Title = styled.h3`
    margin: 0 0 8px;
    color: #666;
`

const Description = styled.p`
    margin: 0 0 24px;
    color: #888;
    font-size: 14px;
`

const CreateButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: #0066cc;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;

    &:hover {
        background: #0052a3;
    }
` 