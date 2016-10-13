const express = require('express')
const imageRequests = require('../models/imageRequests')
const router = express.Router()

//Get OCR from Pictures
router.post('/vision', (req, res) => {
  let url  = req.query;
  imageRequests.getDescription(url, (err, description) => {
    res.send(description);
  })
})

//Send Email With Translation
router.get('/translation/email', (req, res) => {
  let transEmail = req.query
  imageRequests.sendMail(transEmail, (err, confirmation) => {
    res.send(confirmation)
  })
})

//Get transation from Google
router.get('/translation', (req, res) => {
  let imageText = req.query
  imageRequests.getTranslation(imageText, (err, translation) => {
    res.send(translation)
  })
})

module.exports = router
