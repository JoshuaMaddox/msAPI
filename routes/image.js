const express = require('express')
const imageRequests = require('../models/imageRequests')
const router = express.Router()

router.post('/vision', (req, res) => {
  let url  = req.query;
  imageRequests.getDescription(url, (err, description) => {
    res.send(description);
  })
})

//Get transation from Google
router.get('/translation', (req, res) => {
  let imageText = req.query
  imageRequests.getTranslation(imageText, (err, translation) => {
    res.send(translation)
  })
})

// //Add to favorites\
// router.put('/', (req, res) => {
//   let favObj = req.query
//   Tweets.addToFavs(favObj, (err, newFavs) => {
//     res.send(newFavs)
//   })
// })

// //  DELETE FAVORITE
// router.delete('/:id', (req, res) =>  {
//   let id = req.params.id
//   Tweets.deleteFavs(id, (err, newFavs) =>  {
//     res.send(newFavs)
//   })
// })


module.exports = router
