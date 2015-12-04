var path = require('path'),
  express = require('express'),
  webpack = require('webpack'),
  webpackMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  config = require('./webpack.config.js'),
  GameRouter = require('./backend/gameRouter'),
  falcorExpress = require('falcor-express'),
  bodyParser = require('body-parser'),

  isDeveloping = process.env.NODE_ENV !== 'production',
  port = isDeveloping ? 3000 : process.env.PORT,
  app = express();

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use('/model.json', falcorExpress.dataSourceRoute(function() {
    console.log('~~ creating GameRouter');
    return new GameRouter();
  }));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });

} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('Listening at http://localhost:%s/', port);
});