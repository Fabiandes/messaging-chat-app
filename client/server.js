const server = require('./index')

server.listen(() => {
    console.log('Server running on', server.address());
});