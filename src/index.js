import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router';
import Splash from './components/Splash';
import ImgForm from './components/ImgForm'
import ImageTranslation from './components/ImageTranslation'

render(
  <div className="container">
    <Router history = {browserHistory}>
      <Route path = '/' component = {Splash}/>
      <Route path = '/image' component = {ImgForm}/>
      <Route path = '/image/translation' component = {ImageTranslation}/>
    </Router>
  </div>,
  document.getElementById('root')
)
