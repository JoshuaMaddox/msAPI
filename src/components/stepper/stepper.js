import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { setStep } from '../../actions/stepperActions';

const styles = {
  active: {
    backgroundColor: 'red',
  }
}

export default class Stepper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { step } = this.props;

    return (
      <div>
        <span className="step-oval" style={step === 1 ? styles.active : {}} onClick={() => browserHistory.push('/')}></span>
        <span className="step-oval" style={step === 2 ? styles.active : {}} onClick={() => browserHistory.push('/image')}></span>
        <span className="step-oval" style={step === 3 ? styles.active : {}} onClick={() => browserHistory.push('/image/translation')}></span>
      </div>
    );
  }
}
