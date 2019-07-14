const restify = require('restify');
const project = require('./package.json');
const publisherController = require('./controllers/publisher.controller');

function AppServer() {
  // create server
  this.server = restify.createServer({
    name: `${project.name}-server`,
    version: project.version
  });
  
  this.server.use(restify.plugins.bodyParser());
  this.server.use(restify.plugins.queryParser());

  // root
  this.server.get('/', (req, res) => {
    res.send({ success:true, data:'index', message:'This service is running properly', code:200 });
  });

  // publisher route
  this.server.get('/publisher', publisherController.getHandler);
  this.server.post('/publisher', publisherController.postHandler);
  this.server.put('/publisher/:id', publisherController.putHandler);
  this.server.del('/publisher/:id', publisherController.deleteHandler);
}

module.exports = AppServer;