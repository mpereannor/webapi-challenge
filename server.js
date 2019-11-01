const express = require('express');
const helmet = require('helmet');
const actionRouter = require('./data/routers/actions');
const projectsRouter = require('./data/routers/projects');
const app = express();

app.use(helmet());
app.use(express.json());
app.use('/api/actions', actionRouter);
app.use('/api/projects', projectsRouter);

app.get('/', (req, res) => {
    res.send(`<h2 spring challenge</h2>`)
});

module.exports = app