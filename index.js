const moment = require('moment');
const uuidv4 = require('uuid/v4');
const restify = require('restify');
const mongoose = require('mongoose');
const project = require('./package.json');

const port = 9000;
const  time = moment().format('DD/MM/YYYY hh:mm:ss a');

// import model
require('./models/publisher.model');
const Publisher = mongoose.model('publisher');

// create an server
const app = restify.createServer({
  name: `${project.name}-server`,
  version: project.version
});

app.use(restify.plugins.bodyParser());
app.use(restify.plugins.queryParser());

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/test-books', {
  useNewUrlParser: true
})
  .then(() => console.log(`MongoDB connected...`))
  .catch(err => console.log(err));

// root
app.get('/', (req, res) => {
  res.send(`{ success:true, data:Index, message:${project.name}, code:200 }`)
});

// endpoint publisher
app.post('/publisher', (req, res) => {
  let payload = {
    publisher_id: uuidv4(),
    publisher_name: req.body.publisher_name,
    city: req.body.city
  };

  Publisher.create(payload, (err, value) => {
    if (err) {
      return res.status(500).send({'error':'An error has occurred'});
    }

    res.send({
      'code': 201,
      'success': 'true',
      'message': 'Publisher has been inserted',
      'data': value
    });
  });
});

app.get('/publisher', (req, res) => {
  Publisher.find({})
    .then((value) => {
      res.send({
        'code': 200,
        'success': 'true',
        'message': 'Request has been proceseed',
        'data': value
      });
    });
});

app.put('/publisher/:id', (req, res) => {
  let payload = {
    publisher_id: req.params.id
  }

  Publisher.findOneAndUpdate(payload, req.body, (err, value) => {
    if (err) {
      return res.status(500).send({'error':'An error has occurred'});
    }

    res.send({
      'code': 202,
      'success': 'true',
      'message': 'Publisher has been updated',
      'data': value
    });
  });
});

app.del('/publisher/:id', (req, res) => {
  let payload = {
    publisher_id: req.params.id
  }

  Publisher.findOneAndRemove(payload, (err, value) => {
    if (err) {
      return res.status(500).send({'error':'An error has occurred'});
    }

    res.send({
      'code': 204,
      'success': 'true',
      'message': `Publisher ${value.publisher_name} has been deleted`
    });
  });
});

app.listen(port, () => {
  console.log(`Server started at port ${port} on ${time}`);
});