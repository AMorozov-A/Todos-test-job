import { BackgroundModal } from "../Modal/Background"
import { ChangeEvent, FormEvent, useState } from "react"
import {
    ModalWrapper,
    ModalBox,
    Form,
    Title,
    FieldGroup,
    Input,
    ButtonGroup,
    SubmitButton,
    CancelButton,
    ErrorText
} from "../Modal/ModalComponents"

interface RenameTaskModalProps {
    taskId: string;
    currentName: string;
    onClose: () => void;
    onRename: (id: string, newName: string) => void;
}

export const RenameTaskModal = ({ taskId, currentName, onClose, onRename }: RenameTaskModalProps) => {
    const [name, setName] = useState(currentName)
    const [error, setError] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        setError('')
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!name.trim()) {
            setError('Введите имя задачи')
            return
        }
        onRename(taskId, name)
        onClose()
    }

    return (
        <ModalWrapper>
            <ModalBox>
                <Form data-testid="rename-task-form" onSubmit={handleSubmit}>
                    <Title>Rename task</Title>
                    <FieldGroup>
                        <Input
                            data-testid="rename-task-input"
                            value={name}
                            onChange={handleChange}
                            error={!!error}
                            autoFocus
                        />
                        <ErrorText>{error}</ErrorText>
                    </FieldGroup>
                    <ButtonGroup>
                        <SubmitButton data-testid="rename-task-submit" type="submit">Rename</SubmitButton>
                        <CancelButton data-testid="rename-task-cancel" type="button" onClick={onClose}>Cancel</CancelButton>
                    </ButtonGroup>
                </Form>
            </ModalBox>
            <BackgroundModal onClick={onClose} />
        </ModalWrapper>
    )
} 