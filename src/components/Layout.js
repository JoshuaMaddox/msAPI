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
        <h1>Microsoft API</h1> 
        <Link to='/image' className='btn btn-primary'>Submit an Image</Link>
        <div>
          {this.props.children}
        </div>
      </div>

    )
  }
}
  