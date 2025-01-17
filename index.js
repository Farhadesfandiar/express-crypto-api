const express       = require('express');

const bodyParser    = require('body-parser');
const appRoutes= require('./app');

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files from the "public" directory
// app.use(express.static('public'));


// Use the routes defined in app.js
app.use(appRoutes);

// Example API endpoint (keep your existing endpoints here)
app.get('/api/test/', (req, res) => {
    res.json({ message: 'API is workingggggghh!' });
});


// app.get('/api/health', (req, res) => {
//     res.json('API is up and running!');
// });
// Start the Express server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));