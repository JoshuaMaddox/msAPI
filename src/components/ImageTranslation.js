import React, { Component } from 'react'
import ImageStore from '../stores/ImageStore'
import ToAPIActions from '../actions/ToAPIActions'
import { Link } from 'react-router'

var al = 0;

export default class ImageTranslation extends Component {
  constructor() {
    super();
    this.state = {
      imageText: ImageStore.getImageText(),
      message: ImageStore.getMessage(),
      languages: [{'Korean': 'ko'}, {'German': 'de'}, {"Chinese": 'zh-CN'}, {"Dutch": "nl"}, {'Filipino': 'tl'}, {'French': 'fr'}, {'Hebrew': 'iw'}, {'Japanese':'jw'}, {'Russian': 'ru'}, {'Turkish': 'tr'}, {'Yiddish': 'yi'}, {'Vietnamese': 'vi'}],
      input: '',
      transCounter: 0,
      audioConfirm: ImageStore.getAudioConfirmation(),
      fileName: ImageStore.getFileName(),
      al: 0

    }
    this._onChange = this._onChange.bind(this)
    this.getTrans = this.getTrans.bind(this)
    this.sendTranslationToEmail = this.sendTranslationToEmail.bind(this)
    this._grabInput = this._grabInput.bind(this)
    this.getAudio = this.getAudio.bind(this)
    this.progressBarSim = this.progressBarSim.bind(this)

  }

  componentWillMount() {
    ImageStore.startListening(this._onChange)
  }

  componentWillUnmount() {
    this.setState({
      al: 0
    })
    ImageStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState({ 
      imageText: ImageStore.getImageText(),
      message: ImageStore.getMessage(),
      audioConfirm: ImageStore.getAudioConfirmation(),
      fileName: ImageStore.getFileName()
    })
  }

  getTrans(e){
    e.preventDefault();
    let langId = e.target.id;
    const { imageText } = this.state
    ToAPIActions.getTranslation(imageText, langId)
    this.setState({
      transCounter: 1,
      message: undefined
    })

  }

  sendTranslationToEmail(trans){
    let { input, fileName } = this.state;
    ToAPIActions.sendTransEmail(trans, input, fileName);
  }

  _grabInput (e) {
    let input = e.target.value;
    this.setState({
      input,
    })
  }

  progressBarSim() {
    const { al } = this.state
    let newAl = 0
    let intra = setInterval(() => {
      newAl++
      this.setState({
        al: newAl
      })
      document.getElementById('progressBar').value = newAl
    if(newAl === 100){
      console.log('In the if statement: ', al)
      clearInterval(intra)
      return;
    }
    }, 70)
  }

  getAudio(){
    const { imageText } = this.state
    ToAPIActions.getAudio(imageText)
    this.progressBarSim()  
  }

  render() {
    let { languages, imageText, transCounter, message, audioConfirm, fileName, al } = this.state;
    let showEmail;
    let Message;
    let audioFile = <audio controls type="audio/x-wav" src={`../${fileName}`}/>
    let progressBar = <progress id='progressBar' value="0" max="100" style={{width: '500px', height: '20px'}}></progress>

    if (message !== undefined) {
      Message = <h2>{message}</h2>
    } else {
      Message = <div></div>
    }

    if(al > 99){
      progressBar = <progress id='progressBar' value="0" max="100" style={{width: '500px', height: '20px'}} hidden></progress>
    } 

    if(transCounter > 0){
      audioFile = <audio controls type="audio/x-wav" src={`../${fileName}`} hidden/>
      showEmail = (
        <div className="row emailRow text-center">
          <input type="email" className='emailInput' onChange={this._grabInput} placeholder='ENTER YOUR EMAIL ADDRESS'/><br />
          <button id='sendEmail' className='myBtn' onClick={() => this.sendTranslationToEmail(imageText)} >GIMMIE TRANSLATION</button>
        </div>
      )
    } else {
      showEmail = <div></div>
    }
    return (
      <div className="row text-center">
        {this.state.imageText ? <div className='row translationRow'><h3 className='translationText'>{this.state.imageText}</h3></div> : <h1 className='row translationRow'>Send An Image URL to See Translation</h1> }
        {this.state.al ? progressBar : <button className='myBtn' onClick={this.getAudio}>Turn Text To Audio</button>}
        {(this.state.al > 99) ? audioFile : <div></div>}
        {Message}
        {showEmail}
        { 
          languages.map((language, i) => {
            let lang = Object.keys(language)
            return (
              <div className="col-sm-4" key={i}>
                <button className='myBtn' id={language[lang[0]]} onClick={this.getTrans} >{lang[0]}</button>
              </div>
              )
          })

        }
        
      </div>
    )
  }
}
  