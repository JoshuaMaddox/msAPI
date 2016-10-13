import React, { Component } from 'react'
import ImageStore from '../stores/ImageStore'
import ToAPIActions from '../actions/ToAPIActions'
import { Link } from 'react-router'

export default class Layout extends Component {
  constructor() {
    super();
    this.state = {
      imageText: ImageStore.getImageText(),
      translation: ImageStore.getTranslation()
    }
    this._onChange = this._onChange.bind(this)
    this.getTrans = this.getTrans.bind(this)
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
      translation: ImageStore.getTranslation() 
    })
  }

  getTrans(){
    const { imageText } = this.state
    ToAPIActions.getTranslation(imageText)
  }

  render() {
    return (
      <div>
        {this.state.imageText ? <h1>{this.state.imageText}</h1> : <h1>Send An Image URL to See Translation</h1> }
        <button onClick={this.getTrans}>Get Translation</button>
        <div className="row text-center">
          {this.state.translation ? <h1>{this.state.translation}</h1> : <h1>Translation Not Received</h1> }
        </div>
      </div>
    )
  }
}
  