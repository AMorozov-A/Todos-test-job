import { BackgroundModal } from "../Modal/Background"
import { ChangeEvent, FormEvent, useState } from "react"
import type { Task } from "../../types/todoType"
import {
    ModalWrapper,
    ModalBox,
    Form,
    Title,
    FieldGroup,
    Label,
    Input,
    TextArea,
    Select,
    ButtonGroup,
    SubmitButton,
    CancelButton,
    ErrorText
} from "../Modal/ModalComponents"

interface TaskDetailsModalProps {
    task: Task;
    onClose: () => void;
    onUpdate: (taskId: string, updates: Partial<Omit<Task, 'id'>>) => void;
}

const statusOptions = [
    { value: 'pending', label: 'Ожидает' },
    { value: 'in_progress', label: 'В работе' },
    { value: 'completed', label: 'Завершено' },
    { value: 'canceled', label: 'Отменено' }
]

export const TaskDetailsModal = ({ task, onClose, onUpdate }: TaskDetailsModalProps) => {
    const [formData, setFormData] = useState({
        name: task.name,
        description: task.description,
        status: task.status
    })
    const [nameError, setNameError] = useState('')

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (name === 'name') {
            setNameError('')
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!formData.name.trim()) {
            setNameError('Введите имя задачи')
            return
        }
        onUpdate(task.id, formData)
        onClose()
    }

    return (
        <ModalWrapper data-testid="task-details-modal">
            <ModalBox data-testid="task-details-modal-box">
                <Form data-testid="task-details-modal-form" onSubmit={handleSubmit}>
                    <Title>Task Details</Title>
                    <FieldGroup>
                        <Label>Name</Label>
                        <Input
                            data-testid="task-details-modal-name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!nameError}
                        />
                        {nameError && <ErrorText>{nameError}</ErrorText>}
                    </FieldGroup>
                    <FieldGroup>
                        <Label>Description</Label>
                        <TextArea
                            data-testid="task-details-modal-description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <Label>Status</Label>
                        <Select
                            data-testid="task-details-modal-status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Select>
                    </FieldGroup>
                    <ButtonGroup>
                        <SubmitButton data-testid="task-details-modal-submit" type="submit">Save Changes</SubmitButton>
                        <CancelButton data-testid="task-details-modal-cancel" type="button" onClick={onClose}>Cancel</CancelButton>
                    </ButtonGroup>
                </Form>
            </ModalBox>
            <BackgroundModal onClick={onClose} />
        </ModalWrapper>
    )
} 