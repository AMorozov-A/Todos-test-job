import { styled } from "styled-components"
import type { Task as TaskType, TaskStatus } from "../../types/todoType"
import RemoveTaskIcon from '../../assets/icons/RemoveTask.svg?react'
import RenameTaskIcon from '../../assets/icons/RenameTask.svg?react'

interface TaskProps extends TaskType {
    onRename: (id: string) => void;
    onRemove: (id: string) => void;
    onStatusChange: (id: string, status: TaskStatus) => void;
    onOpenDetails: (id: string) => void;
}

const statusOptions: { value: TaskStatus; label: string }[] = [
    { value: 'pending', label: 'Ожидает' },
    { value: 'in_progress', label: 'В работе' },
    { value: 'completed', label: 'Завершено' },
    { value: 'canceled', label: 'Отменено' }
]

export const Task = ({ id, name, status, onRename, onRemove, onStatusChange, onOpenDetails }: TaskProps) => {
    return (
        <TaskBox data-testid={`task-${id}`}>
            <CheckBox
                data-testid="task-checkbox"
                type="checkbox"
                checked={status === 'completed'}
                onChange={() => onStatusChange(id, status === 'completed' ? 'pending' : 'completed')}
            />
            <ContentWrapper>
                <TodosName
                    data-testid={`task-name-${name.toLowerCase().replace(/\s+/g, '-')}`}
                    status={status}
                    onClick={() => onOpenDetails(id)}
                >
                    {name}
                </TodosName>
                <MobileStatusSelect
                    data-testid="task-status-select-mobile"
                    value={status}
                    onChange={(e) => onStatusChange(id, e.target.value as TaskStatus)}
                >
                    {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </MobileStatusSelect>
            </ContentWrapper>
            <DesktopStatusSelect
                data-testid="task-status-select-desktop"
                value={status}
                onChange={(e) => onStatusChange(id, e.target.value as TaskStatus)}
            >
                {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </DesktopStatusSelect>
            <TodosActions>
                <RenameButton data-testid="task-rename-button" onClick={() => onRename(id)}>
                    <RenameTaskIcon width="24" height="24" />
                </RenameButton>
                <RemoveButton data-testid="task-remove-button" onClick={() => onRemove(id)}>
                    <RemoveTaskIcon width="24" height="24" />
                </RemoveButton>
            </TodosActions>
        </TaskBox>
    )
}

const RemoveButton = styled.button`
     all: unset; 
     cursor: pointer; 
`

const RenameButton = styled.button`
     all: unset; 
     cursor: pointer; 
`

const TodosActions = styled.div`
    display: flex;
    gap: 8px;
    justify-content: flex-end;

    @media (max-width: 586px) {
        gap: 4px;
        
        svg {
            width: 20px;
            height: 20px;
        }
    }
`

const TodosName = styled.span<{ status: TaskStatus }>`
    text-decoration: ${props => props.status === 'completed' ? 'line-through' : 'none'};
    color: ${props => {
        switch (props.status) {
            case 'completed': return '#888';
            case 'canceled': return '#ff4d4f';
            case 'in_progress': return '#0066cc';
            default: return 'inherit';
        }
    }};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer; 
    @media (max-width: 586px) {
        font-size: 14px;
    }
`

const CheckBox = styled.input`
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid #0066cc;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    margin-right: 12px;
    position: relative;
    transition: all 0.2s ease-in-out;

    &:checked {
        background-color: #0066cc;
        &:after {
            content: '';
            position: absolute;
            left: 5.5px;
            top: 1px;
            width: 4px;
            height: 9px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
    }

    &:hover {
        background-color: rgba(0, 102, 204, 0.1);
    }
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const BaseStatusSelect = styled.select`
    padding: 6px 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background: transparent;
    font-size: 14px;
    width: 100%;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: #0066cc;
    }
`

const DesktopStatusSelect = styled(BaseStatusSelect)`
    @media (max-width: 586px) {
        display: none;
    }
`

const MobileStatusSelect = styled(BaseStatusSelect)`
    display: none;
    max-width: 140px;
    
    @media (max-width: 586px) {
        display: block;
    }
`

const TaskBox = styled.div`
    display: grid;
    grid-template-columns: auto minmax(200px, 1fr) 150px auto;
    gap: 16px;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #e0e0e0;

    @media (max-width: 586px) {
        grid-template-columns: auto 1fr auto;
    }
`