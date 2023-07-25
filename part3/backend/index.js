const app = require('./app')
const http = require('http')
const config = require('../backend/utils/config');
const logger = require('../backend/utils/logger')


const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`server iniciado en el puerto ${config.PORT}`);
});