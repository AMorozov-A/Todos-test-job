import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TaskDetailsModal } from '../../components/TaskDetailsModal/TaskDetailsModal'
import userEvent from '@testing-library/user-event'

describe('TaskDetailsModal', () => {
  const mockTask = {
    id: '1',
    name: 'Test Task',
    description: 'Test Description',
    status: 'pending' as const
  }

  const mockOnClose = vi.fn()
  const mockOnUpdate = vi.fn()

  it('should display task details and handle updates', async () => {
    render(
      <TaskDetailsModal
        task={mockTask}
        onClose={mockOnClose}
        onUpdate={mockOnUpdate}
      />
    )
    const user = userEvent.setup()

    expect(screen.getByTestId('task-details-modal-name')).toHaveValue('Test Task')
    expect(screen.getByTestId('task-details-modal-description')).toHaveValue('Test Description')
    expect(screen.getByTestId('task-details-modal-status')).toHaveValue('pending')

    await user.clear(screen.getByTestId('task-details-modal-name'))
    await user.type(screen.getByTestId('task-details-modal-name'), 'Updated Task')
    await user.selectOptions(screen.getByTestId('task-details-modal-status'), 'completed')

    await user.click(screen.getByTestId('task-details-modal-submit'))

    expect(mockOnUpdate).toHaveBeenCalledWith('1', {
      name: 'Updated Task',
      description: 'Test Description',
      status: 'completed'
    })
    expect(mockOnClose).toHaveBeenCalled()
  })
}) 