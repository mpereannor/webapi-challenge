const server = require('./server');
//const port = 7000;
server.listen(7000, () => {
    console.log(
        `\n* Server Running on http://localhost:7000 *\n`
    )
});