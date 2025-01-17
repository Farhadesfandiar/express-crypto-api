const express       = require('express');

const bodyParser    = require('body-parser');
const appRoutes= require('./app');

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Use the routes defined in app.js
app.use(appRoutes);

app.get('/api/test/', (req, res) => {
    res.json({ message: 'API is workingggggghh!' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));