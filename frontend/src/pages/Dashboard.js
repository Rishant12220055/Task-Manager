import React, { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { AuthContext } from '../context/AuthContext';
import userService from '../services/userService';
import TaskItem from '../components/TaskItem';
import AddTask from '../components/AddTask';

const Dashboard = () => {
    const { tasks, getTasks, loading: tasksLoading } = useContext(TaskContext);
    const { user, loading: authLoading, reloadUser } = useContext(AuthContext);
    const [message, setMessage] = useState('');

    useEffect(() => {
        getTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubscribe = async () => {
        try {
            const res = await userService.subscribeToEmails();
            setMessage(res.data.msg);
            reloadUser();
        } catch (error) {
            setMessage(error.response.data.msg || 'An error occurred.');
        }
    };

    if (tasksLoading || authLoading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-lg"></span></div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-bold">Dashboard</h1>
                {user && (
                     <button onClick={handleSubscribe} className="btn btn-primary">
                        {user.subscribedToEmails ? 'Unsubscribe' : 'Subscribe to Emails'}
                    </button>
                )}
            </div>
            {message && <div className="alert alert-info my-4">{message}</div>}
            <AddTask />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <TaskItem key={task.id} task={task} />
                    ))
                ) : (
                    <p>No tasks found. Add one to get started!</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard; 