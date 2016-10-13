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


app.get('/image', (req, res) => {
  let imageText = req.query
  console.log('I am imageText in APP.JS', imageText)
  res.send('url')
})

app.post('/image', (req, res) => {
  let url = req.query
  res.send('url')
})

app.use('/image', require('./routes/image'))

// app.post('/image', 
//       {url: imgURL}, 
//       {headers: {
//         'Content-Type': 'application/json',
//         'Ocp-Apim-Subscription-Key': '3d725f94f4274199a9e2095440054f75'
//       }})

// // sendURL(imgURL) {
//     console.log('imgURL: ', imgURL);
//     let url = '/image';
//     axios.get(url, {url: imgURL}, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Ocp-Apim-Subscription-Key': '3d725f94f4274199a9e2095440054f75'
//       }
//     })
//       .then((res) => res.data)
//       .then((data) => {
//         console.log('data: ', data);
//       })
//       // .then(ServerActions.recieveSearchResults)
//       .catch(console.error) 
// //   }
// // }

app.listen(PORT, err => {
  console.log( err || `Express listening on port ${8000}`)
})