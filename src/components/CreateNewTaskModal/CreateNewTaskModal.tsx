import { BackgroundModal } from "../Modal/Background"
import { ChangeEvent, FormEvent, useState } from "react"
import type { Task } from "../../types/todoType"
import {
    ModalWrapper,
    ModalBox,
    Form,
    Title,
    FieldGroup,
    Input,
    TextArea,
    ButtonGroup,
    SubmitButton,
    CancelButton,
    ErrorText
} from "../Modal/ModalComponents"

interface CreateNewTaskModalProps {
    onClose: () => void;
    onCreateTask: (taskData: Omit<Task, 'id' | 'status'>) => void;
}

export const CreateNewTaskModal = ({ onClose, onCreateTask }: CreateNewTaskModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    })
    const [nameError, setNameError] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        onCreateTask(formData)
        onClose()
    }

    return (
        <ModalWrapper data-testid="create-task-modal">
            <ModalBox>
                <Form onSubmit={handleSubmit}>
                    <Title>Create new task</Title>
                    <FieldGroup>
                        <Input
                            data-testid="create-task-name-input"
                            name="name"
                            placeholder="Task name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!nameError}
                            autoFocus
                        />
                        <ErrorText data-testid="create-task-name-error">{nameError}</ErrorText>
                    </FieldGroup>
                    <FieldGroup>
                        <TextArea
                            data-testid="create-task-description-input"
                            name="description"
                            placeholder="Task description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </FieldGroup>
                    <ButtonGroup>
                        <SubmitButton data-testid="create-task-submit" type="submit">Create</SubmitButton>
                        <CancelButton data-testid="create-task-cancel" type="button" onClick={onClose}>Cancel</CancelButton>
                    </ButtonGroup>
                </Form>
            </ModalBox>
            <BackgroundModal onClick={onClose} />
        </ModalWrapper>
    )
} 