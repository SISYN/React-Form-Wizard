import React, { Component } from 'react';
import $ from 'jquery';

class FormWizardPhoneForm extends Component {
  constructor() {
    super();
    this.steps = [
      {
        callback: this.SetPhoneNumber,
        component: this.FormPhoneNumber
      },
      {
        callback: this.SetPhonePlan,
        component: this.FormPhonePlan
      }
    ];
  }

  componentWillMount() {
    console.log('Phone form mounting');
    this.props.callbackSteps(this.steps.length);
    this.props.callbackReady(false);
    this.props.callbackButtonVisibility({
      back: true
    });
  }

  trigger(e) {
    this.steps[this.props.rootState.step].callback.bind(this)(e);
  }

  back() {
    if ( !this.props.rootState.step ) // can't go back any further, switch to _type form again
      this.props.callbackForm('_type');
  }

  submit() {
    this.trigger.bind(this)();
  }

  /* Begin handlers for Step #1 */
  SetPhoneNumber() {
    this.props.callbackInput('phone', {
      ...this.props.rootState._phone,
      number: $('input[data-role="PhoneForm.PhoneNumber"]').val()
    });
  }
  FormPhoneNumber() {
    return (
      <div>
        <h3 className="margin-bottom-30">Enter phone number</h3>
        <input type="text" data-role="PhoneForm.PhoneNumber" onChange={this.SetPhoneNumber.bind(this)} defaultValue={this.DefaultPhoneNumber()}/>
      </div>
    );
  }
  DefaultPhoneNumber() {
    let number = '';
    if ( this.props.rootState._phone !== undefined && this.props.rootState._phone.number != undefined )
      number = this.props.rootState._phone.number;
    return number;
  }
  /* Finish handlers for Step #1 */

  /* Begin handlers for Step #2 */
  SetPhonePlan() {
    this.props.callbackInput('phone', {
      ...this.props.rootState._phone,
      plan: $('select[data-role="PhoneForm.PhonePlan"]').val()
    });
  }
  FormPhonePlan() {
    return (
      <div>
        <h3 className="margin-bottom-30">Select your phone plan</h3>
        <select defaultValue={this.DefaultPhonePlan()} onChange={this.SetPhonePlan.bind(this)} data-role="PhoneForm.PhonePlan">
          <option value="2gb">{'2gb'}</option>
          <option value="4gb">{'4gb'}</option>
          <option value="8gb">{'8gb'}</option>
        </select>
      </div>
    );
  }
  DefaultPhonePlan() {
    let plan = '';
    if ( this.props.rootState._phone !== undefined && this.props.rootState._phone.plan != undefined )
      plan = this.props.rootState._phone.plan;
    return plan;
  }
  /* Finish handlers for Step #2 */




  render() {
    return this.steps[this.props.rootState.step].component.bind(this)();
  }
}

export default FormWizardPhoneForm;
