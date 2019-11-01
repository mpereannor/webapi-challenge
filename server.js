const express = require('express');
const helmet = require('helmet');
const actionRouter = require('./data/routers/actions');
const projectsRouter = require('./data/routers/projects');
const app = express();

app.use(helmet());
//app.use(logger);
app.use(express.json());
app.use('/api/actions', actionRouter);
app.use('/api/projects', projectsRouter);

app.get('/', (req, res) => {
    res.send(`<h2 spring challenge</h2>`)
});

//custom logger middleware
// function logger(req, res, next) { 
//     console.log(req.method,
//                 req.url,
//                 new Date()
//                 .toLocaleTimeString());
//                 next();
// }

module.exports = app