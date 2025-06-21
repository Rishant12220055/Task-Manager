const cron = require('node-cron');
const { readUsers, readTasks } = require('./utils/db');
const sendEmail = require('./utils/email');

const startCronJobs = () => {
    // Run every hour
    cron.schedule('0 * * * *', async () => {
        console.log('Running hourly cron job: sending task reminders...');

        try {
            const users = await readUsers();
            const tasks = await readTasks();

            const subscribedUsers = users.filter(user => user.subscribedToEmails && user.isEmailVerified);

            for (const user of subscribedUsers) {
                const now = new Date();
                const upcomingTasks = tasks.filter(task => {
                    const dueDate = new Date(task.dueDate);
                    const hoursUntilDue = (dueDate - now) / (1000 * 60 * 60);
                    return task.userId === user.id && task.status === 'pending' && hoursUntilDue > 0 && hoursUntilDue <= 24;
                });

                if (upcomingTasks.length > 0) {
                    const taskList = upcomingTasks.map(task => `- ${task.title}`).join('\n');
                    const message = `Hello ${user.name},\n\nYou have the following tasks due soon:\n\n${taskList}\n\nVisit your dashboard to see more.`;

                    await sendEmail({
                        email: user.email,
                        subject: 'Upcoming Task Reminders',
                        message
                    });
                    console.log(`Reminder email sent to ${user.email}`);
                }
            }
        } catch (error) {
            console.error('Error running cron job:', error);
        }
    });
};

module.exports = startCronJobs; 