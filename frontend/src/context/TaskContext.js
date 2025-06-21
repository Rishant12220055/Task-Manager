import React, { createContext, useReducer } from 'react';
import taskService from '../services/taskService';

// Initial State
const initialState = {
    tasks: [],
    loading: true,
    error: null
};

// Create Context
export const TaskContext = createContext(initialState);

// Reducer
const taskReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'GET_TASKS':
            return {
                ...state,
                tasks: payload,
                loading: false
            };
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, payload],
                loading: false
            };
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === payload.id ? payload : task),
                loading: false
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== payload),
                loading: false
            };
        case 'TASK_ERROR':
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
};

// Provider
export const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    // Actions
    const getTasks = async () => {
        try {
            const res = await taskService.getTasks();
            dispatch({ type: 'GET_TASKS', payload: res.data });
        } catch (err) {
            dispatch({ type: 'TASK_ERROR', payload: err.response.data });
        }
    };

    const addTask = async (task) => {
        try {
            const res = await taskService.createTask(task);
            dispatch({ type: 'ADD_TASK', payload: res.data });
        } catch (err) {
            dispatch({ type: 'TASK_ERROR', payload: err.response.data });
        }
    };

    const updateTask = async (id, task) => {
        try {
            const res = await taskService.updateTask(id, task);
            dispatch({ type: 'UPDATE_TASK', payload: res.data });
        } catch (err) {
            dispatch({ type: 'TASK_ERROR', payload: err.response.data });
        }
    };

    const deleteTask = async (id) => {
        try {
            await taskService.deleteTask(id);
            dispatch({ type: 'DELETE_TASK', payload: id });
        } catch (err) {
            dispatch({ type: 'TASK_ERROR', payload: err.response.data });
        }
    };

    return (
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                loading: state.loading,
                error: state.error,
                getTasks,
                addTask,
                updateTask,
                deleteTask
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}; 