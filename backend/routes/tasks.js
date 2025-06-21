const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

// @route   GET api/tasks
// @desc    Get all user tasks
// @access  Private
router.get('/', auth, getTasks);

// @route   POST api/tasks
// @desc    Create a task
// @access  Private
router.post('/', [
    auth,
    check('title', 'Title is required').not().isEmpty(),
    check('status', 'Status is required').isIn(['pending', 'done']),
], createTask);

// @route   PUT api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', auth, updateTask);

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, deleteTask);

module.exports = router; 