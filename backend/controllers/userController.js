const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.updateProfile = async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (name) {
            user.name = name;
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        res.status(200).json({ msg: 'Profile updated successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.subscribeToEmails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.subscribedToEmails = !user.subscribedToEmails;
        await user.save();

        const message = user.subscribedToEmails
            ? 'You have successfully subscribed to email notifications.'
            : 'You have successfully unsubscribed from email notifications.';

        res.status(200).json({ msg: message });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const user = await User.findOne({ emailVerificationToken: token });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid token' });
        }

        user.isEmailVerified = true;
        user.subscribedToEmails = true;
        user.emailVerificationToken = undefined;
        await user.save();

        res.status(200).send('Email verified successfully. You are now subscribed to email notifications.');

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}; 