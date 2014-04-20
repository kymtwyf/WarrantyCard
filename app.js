var express = require('express');
var routes = require('./routes');
var http = require('http');
var redis = require('redis').createClient("6379","103.6.221.224");
var RedisStore = require('connect-redis')(express);

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.use(express.static(__dirname + '/public'));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: 'ExkzTuYGM9YJ7fdvWmhcucqI1BikriJlU9a2DlTCfi5hy0XoUO',
    store: new RedisStore({host: '103.6.221.224', port: 6379, client: redis})
  }));
  app.set('locale','cn');
  app.use(app.router);

});

app.configure('development', function () {
  app.use(express.errorHandler());
});

routes(app);

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});

module.exports = app;

