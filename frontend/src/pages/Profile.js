import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import userService from '../services/userService';

const Profile = () => {
    const { user, reloadUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            setFormData(prev => ({ ...prev, name: user.name, email: user.email }));
        }
    }, [user]);

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password && password !== password2) {
            setMessage('Passwords do not match');
            return;
        }
        try {
            const updateData = { name };
            if (password) {
                updateData.password = password;
            }
            const res = await userService.updateProfile(updateData);
            setMessage(res.data.msg);
            reloadUser();
            setFormData(prev => ({...prev, password: '', password2: ''}));
        } catch (error) {
            setMessage(error.response.data.msg || 'An error occurred');
        }
    };

    if (!user) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-lg"></span></div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">Profile</h1>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <h2 className="card-title">Manage Your Account</h2>
                        {message && <div className="alert alert-info my-4">{message}</div>}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input type="text" name="name" value={name} onChange={onChange} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="email" name="email" value={email} className="input input-bordered" disabled />
                        </div>
                        <p className="text-sm mt-4">Leave passwords blank to keep your current password.</p>
                        <div className="form-control">
                            <label className="label"><span className="label-text">New Password</span></label>
                            <input type="password" name="password" value={password} onChange={onChange} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Confirm New Password</span></label>
                            <input type="password" name="password2" value={password2} onChange={onChange} className="input input-bordered" />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Update Profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile; 