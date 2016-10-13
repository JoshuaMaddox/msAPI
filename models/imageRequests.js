const fs = require('fs'),
      path = require('path'),
      // userFavs = path.join(__dirname, '../data/userFavorites.json')
      axios = require('axios');

// require('dotenv').load()

exports.write = function(newData, cb) {
  let json = JSON.stringify(newData)
  fs.writeFile(userFavs, json, cb)
}


exports.searchTweets = function(searchParams, cb){
  client.get('search/tweets', searchParams, function(err, tweets, response) {
    if(err) return cb(err)
    cb(null, response)
  })
}

//Delete to here

exports.getDescription = function(imgUrl, cb) {
  console.log('imgUrl: ', imgUrl.url)
  let url = 'https://api.projectoxford.ai/vision/v1.0/ocr?language=en&detectOrientation=true';
  axios.post(url, imgUrl, {
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': '3d725f94f4274199a9e2095440054f75'
    }
  })
    .then((res) => {
      console.log('res in model: ', res.data);
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
    })
    .catch((err) => {
      // console.log('err: ', err)
      cb(err)
    }) 
}

exports.getTranslation = function(imageText, cb) {
  let newText = encodeURI(imageText.string)
  // let encodedText = JSON.stringify(imageText)
  // console.log('encodedText: ', encodedText);
  // let encodedText = encodeURI(imageText)
  // let url = `https://www.googleapis.com/language/translate/v2?key=AIzaSyCIipCvL_8JdRDVXS93O5GUb10CxZwVjPw&q=hello%20world&source=en&target=de`;
  let url = `https://www.googleapis.com/language/translate/v2?key=AIzaSyCIipCvL_8JdRDVXS93O5GUb10CxZwVjPw&q=${newText}&source=en&target=ko`;
  axios.get(url)
    .then((res) => {
      const { data } = res
      console.log('I AM RES DATA!!!!!!!!!!!!!! res.data: ', res);
      cb(null, data);
    })
    .catch(err => {
      cb(err);
    })
}

// sendURL(imgURL) {
//     console.log('imgURL: ', imgURL);
//     let url = 'https://api.projectoxford.ai/vision/v1.0/analyze?visualFeatures=Description';
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
//   }