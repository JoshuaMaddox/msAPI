import React, { Component } from 'react'
import ImageStore from '../stores/ImageStore'
import ToAPIActions from '../actions/ToAPIActions'
import { Link } from 'react-router'

export default class Layout extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="row layOutContainer">
        <h1>BEST TRANSLATION APP</h1>
        <div className="row linkRow">
          <h3>GRAB TEXT OFF A PHOTO AND THEN TRANSLATE THAT TASTY TEXT</h3>
          <h3>SAVE THE TRANSLATION AND THEN WISH EVERY TRANSLATION APP WAS SO GOOD</h3>
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
  