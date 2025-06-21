import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-base-200 min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="hero min-h-[60vh] bg-gradient-to-br from-primary to-secondary text-white">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="/logo192.png" className="max-w-xs rounded-lg shadow-2xl" alt="Task Manager Logo" />
          <div>
            <h1 className="text-5xl font-bold">Supercharge Your Productivity</h1>
            <p className="py-6 text-lg">Organize, track, and get reminded about your tasks—all in one place. Stay on top of your day with smart email notifications and a beautiful, easy-to-use dashboard.</p>
            <button className="btn btn-accent btn-lg" onClick={() => navigate('/register')}>Get Started Free</button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card bg-base-100 shadow-xl p-6 items-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="card-title mb-2">Easy Task Management</h3>
            <p className="text-center">Add, edit, and organize your daily tasks with a clean, intuitive interface.</p>
          </div>
          <div className="card bg-base-100 shadow-xl p-6 items-center">
            <div className="text-4xl mb-4">⏰</div>
            <h3 className="card-title mb-2">Smart Reminders</h3>
            <p className="text-center">Get email notifications for tasks due soon so you never miss a deadline.</p>
          </div>
          <div className="card bg-base-100 shadow-xl p-6 items-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="card-title mb-2">Secure & Private</h3>
            <p className="text-center">Your data is protected with secure authentication and privacy-first design.</p>
          </div>
          <div className="card bg-base-100 shadow-xl p-6 items-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="card-title mb-2">Accessible Anywhere</h3>
            <p className="text-center">Access your tasks from any device, anytime, anywhere.</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-base-100 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="flex flex-col items-center">
            <div className="text-3xl mb-2">1️⃣</div>
            <h4 className="font-bold mb-1">Register</h4>
            <p className="text-center">Create your free account in seconds.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl mb-2">2️⃣</div>
            <h4 className="font-bold mb-1">Add Tasks</h4>
            <p className="text-center">Quickly add and organize your to-dos.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl mb-2">3️⃣</div>
            <h4 className="font-bold mb-1">Get Reminders</h4>
            <p className="text-center">Receive timely email notifications for upcoming tasks.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Ready to get organized?</h2>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/register')}>Sign Up Now</button>
        <p className="mt-4">Already have an account? <span className="link link-primary cursor-pointer" onClick={() => navigate('/login')}>Log in</span></p>
      </div>
    </div>
  );
};

export default Home; 