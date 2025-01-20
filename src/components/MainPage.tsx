import styled from "styled-components"
import { TableTodos } from "../components/TableTodos/TableTodos"
import { TaskList, Task, TaskStatus } from "../types/todoType"
import { useState, useEffect } from "react"
import { SearchTask } from "../components/SearchTask/SearchTask"
import { CreateNewTaskModal } from "../components/CreateNewTaskModal/CreateNewTaskModal"
import AddNewTaskIcon from '../assets/icons/addNewTaskIcon.svg?react'
import { RenameTaskModal } from "../components/RenameTaskModal/RenameTaskModal"
import { TaskDetailsModal } from "../components/TaskDetailsModal/TaskDetailsModal"
import { EmptyTaskList } from "./EmptyTaskList/EmptyTaskList"

export const MainPage = () => {
    const [tasks, setTasks] = useState<TaskList>(() => {
        const savedTasks = localStorage.getItem('tasks')
        return savedTasks ? JSON.parse(savedTasks) : []
    })

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const [isOpenedModal, setIsOpenedModal] = useState(false)
    const [renameModal, setRenameModal] = useState<{ id: string; name: string } | null>(null)
    const [taskDetails, setTaskDetails] = useState<string | null>(null)

    const [searchQuery, setSearchQuery] = useState<string>("");


    const handleSearch = (query: string) => {
        setSearchQuery(query);
    }

    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreateTask = (taskData: Omit<Task, 'id' | 'status'>) => {
        const newTask: Task = {
            ...taskData,
            id: Date.now().toString(),
            status: 'pending'
        }
        setTasks(prev => [...prev, newTask])
    }

    const handleRemoveTask = (id: string) => {
        setTasks(prev => prev.filter(task => task.id !== id))
    }

    const handleRenameTask = (id: string) => {
        const task = tasks.find(t => t.id === id)
        if (task) {
            setRenameModal({ id, name: task.name })
        }
    }

    const handleRenameSubmit = (id: string, newName: string) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, name: newName } : task
        ))
    }

    const handleStatusChange = (id: string, newStatus: TaskStatus) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, status: newStatus } : task
        ))
    }

    const handleOpenDetails = (id: string) => {
        setTaskDetails(id)
    }

    const handleUpdateTask = (taskId: string, updates: Partial<Omit<Task, 'id'>>) => {
        setTasks(prev => prev.map(task =>
            task.id === taskId ? { ...task, ...updates } : task
        ))
    }

    return (
        <>
            <PageBox>
                <TitleBox>Todos list</TitleBox>
                {filteredTasks.length > 0 && <SearchTask onSearch={handleSearch} />}
                <TableTodosBox>
                    {filteredTasks.length > 0 ? (
                        <TableTodos
                            tasks={filteredTasks}
                            onRemove={handleRemoveTask}
                            onRename={handleRenameTask}
                            onStatusChange={handleStatusChange}
                            onOpenDetails={handleOpenDetails}
                        />
                    ) : (
                        <EmptyTaskList onCreateClick={() => setIsOpenedModal(true)} />
                    )}
                </TableTodosBox>
            </PageBox>
            {filteredTasks.length > 0 && <ButtonCreateNewTask onClick={() => setIsOpenedModal(true)}>
                <AddNewTaskIcon width="30" height="30" color="#fff" />
            </ButtonCreateNewTask>}
            {isOpenedModal && (
                <CreateNewTaskModal
                    onClose={() => setIsOpenedModal(false)}
                    onCreateTask={handleCreateTask}
                />
            )}
            {renameModal && (
                <RenameTaskModal
                    taskId={renameModal.id}
                    currentName={renameModal.name}
                    onClose={() => setRenameModal(null)}
                    onRename={handleRenameSubmit}
                />
            )}
            {taskDetails && (
                <TaskDetailsModal
                    task={tasks.find(t => t.id === taskDetails)!}
                    onClose={() => setTaskDetails(null)}
                    onUpdate={handleUpdateTask}
                />
            )}
        </>
    )
}

const ButtonCreateNewTask = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #0066cc;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: #b1b1b1;
    }
`

const TitleBox = styled.h1`
    margin: 0 0 20px;
    text-align: center;
`

const PageBox = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
`

const TableTodosBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16px;
    overflow-y: auto;
    flex: 1;
    padding-right: 8px;

    /* Стили для скроллбара */
    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 3px;
    }
`