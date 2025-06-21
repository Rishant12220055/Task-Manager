const { validationResult } = require('express-validator');
const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, status, dueDate } = req.body;

    try {
        const newTask = new Task({
            userId: req.user.id,
            title,
            description: description || '',
            status: status || 'pending',
            dueDate: dueDate || null
        });
        await newTask.save();
        res.json(newTask);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateTask = async (req, res) => {
    const { title, description, status, dueDate } = req.body;
    const { id } = req.params;

    try {
        let task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        if (task.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        if (title) task.title = title;
        if (description) task.description = description;
        if (status) task.status = status;
        if (dueDate) task.dueDate = dueDate;

        await task.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        let task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        if (task.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await task.deleteOne();
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}; 