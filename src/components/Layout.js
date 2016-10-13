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
        <h1>Best Translation App</h1>
        <div className="row linkRow">
          <Link to='/image' className='searchBtnLayout' >Submit an Image</Link>
        </div> 
        <div>
          {this.props.children}
        </div>
      </div>

    )
  }
}
  