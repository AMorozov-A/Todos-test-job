import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useState } from 'react'

describe('LocalStorage functionality', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should save and load tasks from localStorage', () => {
    const testTasks = [
      { id: '1', name: 'Test Task', description: 'Test Description', status: 'pending' }
    ]

    localStorage.setItem('tasks', JSON.stringify(testTasks))

    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    
    expect(savedTasks).toEqual(testTasks)
  })

  it('should return empty array when localStorage is empty', () => {
    const { result } = renderHook(() => {
      return useState(() => {
        const savedTasks = localStorage.getItem('tasks')
        return savedTasks ? JSON.parse(savedTasks) : []
      })
    })

    expect(result.current[0]).toEqual([])
  })
}) 