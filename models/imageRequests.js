const fs = require('fs'),
      path = require('path'),
      imageText = path.join(__dirname, '../data/imageText.json'),
      trans = path.join(__dirname, '../data/translations.json'),
      axios = require('axios')

require('dotenv').load()

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
exports.sendMail = function(transText, cb) {
  var helper = require('sendgrid').mail
  var from_email = new helper.Email('best_translation_app@Better-Than-Theirs.com')
  var to_email = new helper.Email(transText.email)
  var subject = "Here's Your Way Better Translation"
  var content = new helper.Content('text/plain', transText.q)
  var mail = new helper.Mail(from_email, subject, to_email, content)
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  })
  sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
    cb(null, response)
  })
}

exports.write = function(newData, cb) {
  let json = JSON.stringify(newData)
  fs.writeFile(imageText, json, cb)
}


exports.searchTweets = function(searchParams, cb){
  client.get('search/tweets', searchParams, function(err, tweets, response) {
    if(err) return cb(err)
    cb(null, response)
  })
}

exports.read = function(cb) {
  fs.readFile(imageText, (err, buffer) => {
    let newStr;
    if(err) return cb(err)
      try {
        var imgTxt = JSON.parse(buffer)
      } catch(e) {
        var imgTxt = []
      }
      cb(null, imgTxt)
  })
}

exports.getDescription = function(imgUrl, cb) {
  let url = 'https://api.projectoxford.ai/vision/v1.0/ocr?language=en&detectOrientation=true';
  axios.post(url, imgUrl, {
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': process.env.Ocp_Apim_Subscription_Key
    }
  })
    .then((res) => {
      const { regions } = res.data
      const { lines } = regions[0] 
      let newStr;
      let arr = []
        lines.forEach((line) => {
          let newArr  = line.words
          newArr.forEach((word) => {
            arr.push(word.text)
          })
        })
      let imageStr = arr.join(' ')
      cb(null, imageStr);
      exports.write(imageStr)
    })
    .catch((err) => {
      cb(err)
    }) 
}

exports.getTranslation = function(imageText, cb) {
  exports.read((err, imgTxt) => {
    let { id } = imageText;
    let newText = encodeURIComponent(imgTxt)
    let url = `https://www.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_KEY}=${newText}&source=en&target=${id}`;
    axios.get(url)
      .then((res) => {
        const { data } = res
        cb(null, data);
      })
      .catch(err => {
        cb(err);
      }) 
  })
}