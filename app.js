const PORT = 8000,
      cors = require('cors'),
      path = require('path'),
      morgan = require('morgan'),
      express = require('express'),
      webpack = require('webpack'),
      bodyParser = require('body-parser'),
      webpackConfig = require('./webpack.config'),
      imageRequests = require('./models/imageRequests'),
      webpackDevMiddleware = require('webpack-dev-middleware'),
      webpackHotMiddleware = require('webpack-hot-middleware')

//Express invocation
const app = express()

//Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Webpack Configuration
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath, noInfo: true
}))
app.use(webpackHotMiddleware(compiler))

// app.get('*', (req, res) => {
//   let indexPath = path.join(__dirname, '../src/index.html')
//   res.sendFile(indexPath);
// })

app.use('/image', require('./routes/image'))

app.listen(PORT, err => {
  console.log( err || `Express listening on port ${8000}`)
})