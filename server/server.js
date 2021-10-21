import express from 'express'
import data from './data.js';

const app = express();

app.get('/api/questions', (req, res) => {
    res.send(data.questions);
});

app.get('/', (req, res) => {
    res.send('Server is Ready');
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});