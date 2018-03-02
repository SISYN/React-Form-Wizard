// This template is based on
// http://www.ansonika.com/mavia/index.html
import React, { Component } from 'react';
import Alert from './alert';
import TypesForm from './forms/_type';
import PhoneForm from './forms/phone';

class FormWizard extends Component {
  constructor() {
    super();
    this.forms = {};
    this.state = {
      form: '_type',
      step: 0, // update inside FormWizard
      steps: 0, // set by component in callbackTotalSteps()
      ready: false, // updated via callbackFormReady()
      buttons: {
        back: true,
        next: true,
        print: false
      }
      // Individual form types have their data stored here with _formName nomenclature.
      // Form 'phone' stored via StoreFormData would resemble:
      // _phone: { number: '+13363555575' }
    };
  }

  SetForm(formName) { this.setState({form: formName, step: 0}); }
  SetFormReady(state) { this.setState({ready: state}); }
  StoreFormSteps(steps) { this.setState({steps:steps}); }
  StoreFormData(formName, formData) { this.setState({ ['_'+formName]: formData }); }
  SetButtonStates(newButtonStates) { this.setState({ buttons: Object.assign(this.state.buttons, newButtonStates) }); }

  componentDidUpdate() {
    console.log('New state:');
    console.log(this.state);
  }

  buttonNext(e) { e.preventDefault(); this.setState({step: this.state.step+1}); this.forms[this.state.form].submit(); }
  buttonBack(e) { e.preventDefault(); if ( this.state.step ) this.setState({step: this.state.step-1}); this.forms[this.state.form].back(); }
  buttonPrint(e) {
    e.preventDefault();
    let printWindow = window.open('','','width=768,height=420');
    printWindow.document.write('<h1>FormWizard printable version</h1>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }

  render() {
    let formProps = {
      ref: instance => { this.forms[ this.state.form ] = instance; },
      rootState: this.state,
      callbackForm: this.SetForm.bind(this),
      callbackReady: this.SetFormReady.bind(this),
      callbackInput: this.StoreFormData.bind(this),
      callbackSteps: this.StoreFormSteps.bind(this),
      callbackButtonVisibility: this.SetButtonStates.bind(this),
    };
    return (
      <section className="FormWizard">
        <form>
          <p className="text-right"><small>Prototype v{'0.1.0'}</small></p>
          <div className="details-col">
            <img src="/media/images/forms/registration.svg" alt="" />
            <h2>Form Wizard</h2>
            <p>
              Flexible form management, built for all sizes.
            </p>
            <a href="#faq">i</a>
          </div>
          <div className="input-col">
            <div className="progress-bar" />
            <div className="input-area">
              <div className="form-alerts-area"></div>
              <button className="print" style={!this.state.buttons.print ? {display: 'none'} : {}} onClick={this.buttonPrint.bind(this)}>Print</button>
              <p className="progress-counter">{(this.state.steps <= 1)?'':(this.state.step+1)+'/'+this.state.steps}</p>
              {{
                _type: <TypesForm {...formProps} />,
                phone: <PhoneForm {...formProps} />
              }[this.state.form]}
              <div className="nav-area">
                <button className="back" style={!this.state.buttons.back ? {display: 'none'} : {}} onClick={this.buttonBack.bind(this)}>Back</button>
                <button className="next" style={!this.state.buttons.next ? {display: 'none'} : {}} onClick={this.buttonNext.bind(this)}>Next</button>
              </div>
            </div>
          </div>
          <div className="footer">
            <p>&copy; {new Date().getFullYear()} Adom</p>
            <ul>
              <li><a href="#page">FAQ</a></li>
              <li><a href="#page">Support</a></li>
            </ul>
          </div>
        </form>
      </section>
    );
  }
}

export default FormWizard;
