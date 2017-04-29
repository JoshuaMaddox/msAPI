const fs = require('fs'),
      path = require('path'),
      watson = require('watson-developer-cloud'),
      imageText = path.join(__dirname, '../data/imageText.json'),
      trans = path.join(__dirname, '../data/translations.json'),
      axios = require('axios')

let fileName = 0;

require('dotenv').config({ silent: true})

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
exports.sendMail = function(transText, cb) {
  let omega = transText.fileName;
  var helper = require('sendgrid').mail
  var from_email = new helper.Email('transmorgiBot@transmorgi.com')
  var to_email = new helper.Email(transText.email)
  var subject = "Somebody sent you a Transmorgi!"
  console.log('Sanity:0');
  let newMusicFile = fs.readFileSync(path.join(__dirname, `../build/${omega}`))
  let finalMusicFile = new Buffer(newMusicFile).toString('base64')
  console.log('I am finalMusicFile ', finalMusicFile)
  console.log('Sanity:1');

  var attachment = new helper.Attachment()
  attachment.setContent(finalMusicFile)
  attachment.setType("audio/wav")
  attachment.setFilename(omega)
  attachment.setDisposition("attachment")

  // var attachment = new helper('../build/audio_1.wav')
  var content = new helper.Content('text/plain', transText.q)
  var mail = new helper.Mail(from_email, subject, to_email, content)
  mail.addAttachment(attachment)
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
  console.log('process.env.GOOGLE_KEY: ', process.env.GOOGLE_KEY);
  exports.read((err, imgTxt) => {
    let { id } = imageText;
    let newText = encodeURIComponent(imgTxt)
    let url = `https://www.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_KEY}&q=${newText}&source=en&target=${id}`;
    console.log('url: ', url);
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

exports.getAudio = function(cb) {
  fileName++
  let textToAudio = `audio_${fileName}.wav`
  exports.read((err, imgTxt) => {
    var text_to_speech = watson.text_to_speech({
      username: process.env.IBM_USER,
      password: process.env.IBM_PASS,
      version: 'v1'
    });
    var params = {
      text: imgTxt,
      voice: 'en-GB_KateVoice',
      accept: 'audio/wav'
    };
    text_to_speech.synthesize(params).pipe(fs.createWriteStream(`./build/${textToAudio}`));
    cb(null, textToAudio)
  })
}
