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
      <div>
        <div>
          <h1>Microsoft API</h1> 
          <button className="btn btn-primary" onClick={this.testFunc}>Test</button> 
          <Link to='/image' className='btn btn-primary'>Submit an Image</Link>
          <Link to='/image/translation' className='btn btn-primary'>See Translation</Link>
          <div>
            {this.props.children}
          </div>
        </div>
      </div>

    )
  }
}
  