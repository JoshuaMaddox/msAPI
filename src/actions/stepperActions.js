import AppDispatcher from './AppDispatcher';

const stepperActions = {
  setStep(step) {
    AppDispatcher.dispatch({
      type: 'STEP_TAKEN',
      payload: step
    })
  }
}
