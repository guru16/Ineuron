const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const router = [ './src/modules/items/item.route.ts']


swaggerAutogen(outputFile, router)