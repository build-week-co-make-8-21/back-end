require('dotenv').config();

const server = require('./api/server.js');

console.log(`NODE_ENV = ${process.env.NODE_ENV}`)

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`server running on port ${port}`));