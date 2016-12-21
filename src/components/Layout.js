import React, { Component } from 'react'
import ImageStore from '../stores/ImageStore'
import ToAPIActions from '../actions/ToAPIActions'
import { Link } from 'react-router'

export default class Layout extends Component {
  render() {
    return (
      <div className="row layOutContainer">
        <h1>3 STEPS OF TRANSMORGI</h1>
        <div className="row linkRow">
          <h3>1. ENTER IN URL OF A PHOTO WITH ENGLISH TEXT ON IT</h3>
          <h3>2. GRAB TEXT OFF PHOTO AND THEN TRANSLATE THAT TASTY TEXT</h3>
          <h3>3. TRANSMORGIFY THAT TEXT INTO AUDIO AND THEN EMAIL IT TO YOUR MATES</h3>
        <div className="startBtnRow">
          <Link to='/image' className='searchBtnLayout' >GET STARTED</Link>
        </div>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>

    )
  }
}
