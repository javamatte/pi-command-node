
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , error = require('./routes/error')
  , status = require('./routes/status')
  , api = require('./routes/api')
  , http = require('http')
  , expressLayouts = require('express-ejs-layouts')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('deadbeef1'));
  app.use(express.session());
  app.use(expressLayouts);
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// routes (initially defined above)
app.get('/', routes.index);
app.get('/docs', error.notImplemented);
app.get('/examples', error.notImplemented);
app.get('/status', status.index);
app.get('/api/pin/:pin/read', api.readPin);
app.get('/api/pin/:pin/write/:value', api.writePin);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
