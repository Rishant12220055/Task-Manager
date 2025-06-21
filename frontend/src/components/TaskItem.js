import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const TaskItem = ({ task }) => {
    const { deleteTask, updateTask } = useContext(TaskContext);

    const handleDelete = () => {
        deleteTask(task.id);
    };

    const handleToggleStatus = () => {
        const updatedTask = { ...task, status: task.status === 'pending' ? 'done' : 'pending' };
        updateTask(task.id, updatedTask);
    };

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{task.title}</h2>
                <p>{task.description}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">{task.status}</div>
                    {task.dueDate && <div className="badge badge-outline">{new Date(task.dueDate).toLocaleString()}</div>}
                </div>
                <div className="card-actions justify-end mt-4">
                    <button onClick={handleToggleStatus} className="btn btn-sm btn-ghost">Toggle Status</button>
                    <button className="btn btn-sm btn-ghost">Edit</button>
                    <button onClick={handleDelete} className="btn btn-sm btn-error">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem; 