console.log("Script running...");

const jwt = require('jsonwebtoken');
console.log("jsonwebtoken module loaded");

const secret = 'mydevsecretkey';
const payload = { userId: '123456', email: 'test@example.com', role: 'user' };
const options = { expiresIn: '1h' };

const token = jwt.sign(payload, secret, options);

console.log("Generated JWT:\n", token);
