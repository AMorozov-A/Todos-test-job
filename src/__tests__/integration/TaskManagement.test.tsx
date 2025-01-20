import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MainPage } from '../../pages/MainPage'
import userEvent from '@testing-library/user-event'

describe('Task Management Integration', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should create, rename and delete a task', async () => {
    render(<MainPage />)
    const user = userEvent.setup()

    const createButton = screen.getByTestId('empty-task-list-create')
    await user.click(createButton)

    const nameInput = screen.getByTestId('create-task-name-input')
    const descriptionInput = screen.getByTestId('create-task-description-input')
    await user.type(nameInput, 'Test Task')
    await user.type(descriptionInput, 'Test Description')

    const submitButton = screen.getByTestId('create-task-submit')
    await user.click(submitButton)

    expect(screen.getByTestId('task-name-test-task')).toHaveTextContent('Test Task')

    const renameButton = screen.getByTestId('task-rename-button')
    await user.click(renameButton)

    const renameInput = screen.getByTestId('rename-task-input')
    await user.clear(renameInput)
    await user.type(renameInput, 'Updated Task')

    const renameSubmit = screen.getByTestId('rename-task-submit')
    await user.click(renameSubmit)

    expect(screen.getByTestId('task-name-updated-task')).toHaveTextContent('Updated Task')

    const removeButton = screen.getByTestId('task-remove-button')
    await user.click(removeButton)

    await waitFor(() => {
      expect(screen.queryByTestId('task-name-updated-task')).not.toBeInTheDocument()
    })
  })

  it('should filter tasks by search', async () => {
    render(<MainPage />)
    const user = userEvent.setup()

    const createButton = screen.getByTestId('empty-task-list-create')
    await user.click(createButton)
    await user.type(screen.getByTestId('create-task-name-input'), 'Task One')
    await user.click(screen.getByTestId('create-task-submit'))

    const createButtonAgain = screen.getByTestId('create-new-task-button')
    await user.click(createButtonAgain)
    await user.type(screen.getByTestId('create-task-name-input'), 'Task Two')
    await user.click(screen.getByTestId('create-task-submit'))

    const searchInput = screen.getByTestId('search-task-input')
    await user.type(searchInput, 'One')

    screen.debug()

    expect(screen.getByTestId('task-name-task-one')).toBeInTheDocument()
    expect(screen.queryByTestId('task-name-task-two')).not.toBeInTheDocument()
  })

  it('should filter tasks by status', async () => {
    render(<MainPage />)
    const user = userEvent.setup()

    const createButton = screen.getByTestId('empty-task-list-create')
    await user.click(createButton)
    await user.type(screen.getByTestId('create-task-name-input'), 'Pending Task')
    await user.click(screen.getByTestId('create-task-submit'))

    const createButtonAgain = screen.getByTestId('create-new-task-button')
    await user.click(createButtonAgain)
    await user.type(screen.getByTestId('create-task-name-input'), 'Completed Task')
    await user.click(screen.getByTestId('create-task-submit'))

    const statusSelect = screen.getAllByTestId('task-status-select-desktop')[1]
    await user.selectOptions(statusSelect, 'completed')

    const statusFilter = screen.getByTestId('status-filter-select')
    await user.selectOptions(statusFilter, 'completed')

    expect(screen.queryByTestId('task-name-pending-task')).not.toBeInTheDocument()
    expect(screen.getByTestId('task-name-completed-task')).toBeInTheDocument()

    await user.selectOptions(statusFilter, 'all')
    expect(screen.getByTestId('task-name-pending-task')).toBeInTheDocument()
    expect(screen.getByTestId('task-name-completed-task')).toBeInTheDocument()
  })

  it('should show no tasks message when filter returns empty result', async () => {
    render(<MainPage />)
    const user = userEvent.setup()

    const createButton = screen.getByTestId('empty-task-list-create')
    await user.click(createButton)
    await user.type(screen.getByTestId('create-task-name-input'), 'Pending Task')
    await user.click(screen.getByTestId('create-task-submit'))

    expect(screen.getByTestId('search-task-input')).toBeInTheDocument()
    expect(screen.getByTestId('status-filter-select')).toBeInTheDocument()

    const statusFilter = screen.getByTestId('status-filter-select')
    await user.selectOptions(statusFilter, 'completed')

    expect(screen.getByTestId('no-filtered-tasks-message')).toHaveTextContent('Задач по данному фильтру нет')

    expect(screen.getByTestId('search-task-input')).toBeInTheDocument()
    expect(screen.getByTestId('status-filter-select')).toBeInTheDocument()

    await user.selectOptions(statusFilter, 'all')

    expect(screen.getByTestId('task-name-pending-task')).toBeInTheDocument()
  })

  it('should show no tasks message when search returns empty result', async () => {
    render(<MainPage />)
    const user = userEvent.setup()

    const createButton = screen.getByTestId('empty-task-list-create')
    await user.click(createButton)
    await user.type(screen.getByTestId('create-task-name-input'), 'Test Task')
    await user.click(screen.getByTestId('create-task-submit'))

    const searchInput = screen.getByTestId('search-task-input')
    await user.type(searchInput, 'Nonexistent Task')

    expect(screen.getByTestId('no-filtered-tasks-message')).toHaveTextContent('Задач по данному фильтру нет')

    expect(screen.getByTestId('search-task-input')).toBeInTheDocument()
    expect(screen.getByTestId('status-filter-select')).toBeInTheDocument()

    await user.clear(searchInput)

    expect(screen.getByTestId('task-name-test-task')).toBeInTheDocument()
  })
}) 