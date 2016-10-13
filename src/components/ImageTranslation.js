import React, { Component } from 'react'
import ImageStore from '../stores/ImageStore'
import ToAPIActions from '../actions/ToAPIActions'
import { Link } from 'react-router'

export default class ImageTranslation extends Component {
  constructor() {
    super();
    this.state = {
      imageText: ImageStore.getImageText(),
      message: ImageStore.getMessage(),
      languages: [{'Korean': 'ko'}, {'German': 'de'}, {"Chinese": 'zh-CN'}, {"Dutch": "nl"}, {'Filipino': 'tl'}, {'French': 'fr'}, {'Hebrew': 'iw'}, {'Japanese':'jw'}, {'Russian': 'ru'}, {'Turkish': 'tr'}, {'Yiddish': 'yi'}, {'Vietnamese': 'vi'}],
      input: '',
      transCounter: 0
    }
    this._onChange = this._onChange.bind(this)
    this.getTrans = this.getTrans.bind(this)
    this.sendTranslationToEmail = this.sendTranslationToEmail.bind(this)
    this._grabInput = this._grabInput.bind(this)
  }

  componentWillMount() {
    ImageStore.startListening(this._onChange)
  }

  componentWillUnmount() {
    ImageStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState({ 
      imageText: ImageStore.getImageText(),
      message: ImageStore.getMessage()
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
    let { input } = this.state;
    ToAPIActions.sendTransEmail(trans, input);
  }

  _grabInput (e) {
    let input = e.target.value;
    this.setState({
      input,
    })
  }

  render() {
    let { languages, imageText, transCounter, message } = this.state;
    let showEmail;
    let Message;

    if (message !== undefined) {
      Message = <h2>{message}</h2>
    } else {
      Message = <div></div>
    }

    if(transCounter > 0){
      showEmail = (
        <div>
          <input type="email" onChange={this._grabInput} placeholder='YourEmailAdress@xxx.com'/>
          <button id='sendEmail' className='myBtn' onClick={() => this.sendTranslationToEmail(imageText)} >Send This Translation To My Email</button>
        </div>
      )
    } else {
      showEmail = <div></div>
    }
    return (
      <div className="row text-center">
        {this.state.imageText ? <div className='row translationRow'><h3 className='translationText'>{this.state.imageText}</h3></div> : <h1 className='row translationRow'>Send An Image URL to See Translation</h1> }
        { 
          languages.map((language, i) => {
            let lang = Object.keys(language)
            return (
              <button key={i} className='myBtn' id={language[lang[0]]} onClick={this.getTrans} >{lang[0]}</button>
              )
          })
        }
        {showEmail}
        {Message}
      </div>
    )
  }
}
  