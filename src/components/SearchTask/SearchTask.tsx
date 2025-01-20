import { styled } from "styled-components"

interface SearchTaskProps {
    onSearch: (query: string) => void;
}

export const SearchTask = ({ onSearch }: SearchTaskProps) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    }

    return (
        <SearchTaskForm>
            <SearchTaskInputBox
                data-testid="search-task-input"
                placeholder="Search task"
                onChange={handleInputChange}
            />
            <SubmitButton data-testid="search-task-submit" type="submit">Search</SubmitButton>
        </SearchTaskForm>
    )
}

const SearchTaskForm = styled.form`
    display: flex;
    gap: 8px;
    width: 100%;
    padding: 0 8px;
`

const SearchTaskInputBox = styled.input`
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