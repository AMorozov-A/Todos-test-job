import { styled } from "styled-components"

export const ModalBox = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 500px;
    width: 100%;
    background: rgb(23, 22, 22);
    border-radius: 8px;
    z-index: 1000;
`

export const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

export const Form = styled.form`
    padding: 24px;
`

export const Title = styled.h2`
    color: #fff;
    margin: 0 0 24px;
`

export const FieldGroup = styled.div`
    margin-bottom: 20px;
`

export const Label = styled.label`
    display: block;
    color: #fff;
    margin-bottom: 8px;
    font-size: 14px;
`

export const Input = styled.input<{ error?: boolean }>`
    width: 100%;
    padding: 8px;
    border: 1px solid ${props => props.error ? '#ff4d4f' : '#ccc'};
    border-radius: 4px;
    background: transparent;
    color: #fff;
    
    &:focus {
        outline: none;
        border-color: ${props => props.error ? '#ff4d4f' : '#0066cc'};
    }

    ${props => props.error === undefined && 'error: undefined;'}
`

export const TextArea = styled.textarea`
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    min-height: 100px;
    max-height: 400px;
    resize: vertical;
    background: transparent;
    color: #fff;

    &:focus {
        outline: none;
        border-color: #0066cc;
    }
`

export const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 24px;
`

const BaseButton = styled.button`
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
`

export const SubmitButton = styled(BaseButton)`
    background: #0066cc;
    color: white;
    
    &:hover {
        background: #0052a3;
    }
`

export const CancelButton = styled(BaseButton)`
    background: #666;
    color: white;
    
    &:hover {
        background: #555;
    }
`

export const ErrorText = styled.span`
    color: #ff4d4f;
    font-size: 14px;
    display: block;
    margin-top: 4px;
`

export const Select = styled.select`
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: transparent;
    color: #fff;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: #0066cc;
    }

    option {
        background: rgb(23, 22, 22);
    }
` 