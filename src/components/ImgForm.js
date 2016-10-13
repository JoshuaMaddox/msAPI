import React, { Component } from 'react'
import ToAPIActions from '../actions/ToAPIActions'
import { Link, browserHistory } from 'react-router'
import ImageTranslation from './ImageTranslation'

export default class ImgForm extends Component {
  constructor() {
    super();
    this.sendImg = this.sendImg.bind(this)
  }

  sendImg(e){
    e.preventDefault()
    const { url } = this.refs
    let imgUrl = url.value
    ToAPIActions.sendURL(imgUrl)
  }

  render() {
    return (
        <div className="col-sm-8 col-sm-offset-2 searchForm text-center">
          <h3>Img Form Component</h3>
          <form onSubmit={this.sendImg}>
            <div className="form-group">
              <input type="text" className="form-control myFormControl" ref='url' id="term" placeholder="Enter a search term" required/>
            </div>
            <button type="submit" className="searchBtn">Search</button>
          </form>
        </div>
    )
  }
}