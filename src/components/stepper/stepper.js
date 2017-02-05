import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { setStep } from '../../actions/stepperActions';

const styles = {
  active: {
    backgroundColor: 'white',
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
        <span className="step-oval" style={step === 2 ? styles.active : {}} onClick={() => browserHistory.push('/confirmation')}></span>
        <span className="step-oval" style={step === 3 ? styles.active : {}} onClick={() => browserHistory.push('/payment')}></span>
      </div>
    );
  }
}
