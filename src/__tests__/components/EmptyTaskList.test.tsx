import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EmptyTaskList } from '../../components/EmptyTaskList/EmptyTaskList'
import userEvent from '@testing-library/user-event'

describe('EmptyTaskList', () => {
    it('should render empty state and handle create click', async () => {
        const mockOnCreateClick = vi.fn()
        
        render(<EmptyTaskList onCreateClick={mockOnCreateClick} />)
        const user = userEvent.setup()

        expect(screen.getByText('Список задач пуст')).toBeInTheDocument()
        expect(screen.getByText('Создайте свою первую задачу')).toBeInTheDocument()

        const createButton = screen.getByTestId('empty-task-list-create')
        await user.click(createButton)
        
        expect(mockOnCreateClick).toHaveBeenCalled()
    })
})