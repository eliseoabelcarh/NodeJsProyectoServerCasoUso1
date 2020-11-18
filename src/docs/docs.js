

const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    info: {
        // API informations (required)
        title: 'Hello World', // Title (required)
        version: '1.0.0', // Version (required)
        description: 'A sample API', // Description (optional)
    },
    host, // Host (optional)
    basePath: '/', // Base path (optional)
};

const options = {
    swaggerDefinition,
    apis: ['./src/server/routerHandler.js'], // <-- not in the definition, but in the options
};

const swaggerSpec = swaggerJSDoc(options);