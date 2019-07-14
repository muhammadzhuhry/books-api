const restify = require('restify');
const project = require('./package.json');
const authorController = require('./controllers/author.controller');
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

  // author route
  this.server.get('/author', authorController.getHandler);
  this.server.post('/author', authorController.postHandler);
  this.server.put('/author/:id', authorController.putHandler);
  this.server.del('/author/:id', authorController.deleteHandler);

  // publisher route
  this.server.get('/publisher', publisherController.getHandler);
  this.server.post('/publisher', publisherController.postHandler);
  this.server.put('/publisher/:id', publisherController.putHandler);
  this.server.del('/publisher/:id', publisherController.deleteHandler);
}

module.exports = AppServer;