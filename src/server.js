const Hapi = require('@hapi/hapi');
const routes = require('./routes.js');

const init = async () => {
    const server = Hapi.Server({
        port:5000,
        host:process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        //CROS for solve Same-Origin policy Problem
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);
    await server.start();
    console.log(`Server is running on ${server.info.uri}`);
};

init();