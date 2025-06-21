const fs = require('fs').promises;
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const usersPath = path.join(dataDir, 'users.json');
const tasksPath = path.join(dataDir, 'tasks.json');

const readData = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return []; // Return empty array if file doesn't exist
        }
        throw error;
    }
};

const writeData = async (filePath, data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

module.exports = {
    readUsers: () => readData(usersPath),
    writeUsers: (data) => writeData(usersPath, data),
    readTasks: () => readData(tasksPath),
    writeTasks: (data) => writeData(tasksPath, data)
}; 