import React, { Component } from 'react';
import $ from 'jquery';

class FormWizardFormSelector extends Component {
  constructor() {
    super();
    this.steps = [
      this.Step1_SetFormType
    ];
  }

  componentWillMount() {
    this.props.callbackButtonVisibility({
      back: false
    });
    this.props.callbackSteps(this.steps.length);
    this.props.callbackReady(false);

    // check for preset values in

  }

  trigger(e) {
    this.steps[this.props.rootState.step].bind(this)(e);
  }

  back() {
    alert('Nowhere to go but forward');
  }

  submit() {
    this.trigger.bind(this)();
  }


  Step1_SetFormType() {
    let selectedForm = $('input[type="radio"]:checked').val();
    this.props.callbackInput('_type', selectedForm);
    this.props.callbackForm(selectedForm);
  }


  render() {
    console.log('RootState: '+this.props.rootState.__type);
    return (
      <div>
        <h3 className="margin-bottom-30">Which form?</h3>
        <label className="radioBlock">
          <input type="radio" name="radio" value="bank" defaultChecked={this.props.rootState.__type === 'bank'} />
          <div className="box">
            <span>Bank</span>
          </div>
        </label>

        <label className="radioBlock">
          <input type="radio" name="radio" value="phone" defaultChecked={this.props.rootState.__type === 'phone'} />
          <div className="box">
            <span>Phone</span>
          </div>
        </label>

        <label className="radioBlock">
          <input type="radio" name="radio" value="business" defaultChecked={this.props.rootState.__type === 'business'} />
          <div className="box">
            <span>Business</span>
          </div>
        </label>
      </div>
    );
  }
}

export default FormWizardFormSelector;
