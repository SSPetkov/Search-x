const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const data = require('./data.json');
const words = require('./words.json');


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());


app.get('/api/autocomplete', async (req, res) => {
    try {
        const {q} = req.query;
        if (!q) {
            return res.status(400).json({error: 'Search query is required'});
        }
        const filtered = words.filter((entry) => {
            return entry.toLowerCase().startsWith(q.toLowerCase())
        })

        res.json(filtered.slice(0, 10));
    } catch (error) {
        console.error('Error fetching data: ', error);
        res.status(500).json({error: 'Internal server error'});
    }
});
app.get('/api/search', async (req, res) => {
    try {
        const {q} = req.query;
        if (!q) {
            return res.status(400).json({error: 'Search query is required'});
        }
        const filtered = data.filter((entry) => {
            if (entry.title.toLowerCase().includes(q.toLowerCase())) return entry
        })

        res.json(filtered);
    } catch (error) {
        console.error('Error fetching data: ', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});
