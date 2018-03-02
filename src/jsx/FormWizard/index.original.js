// This template is based on
// http://www.ansonika.com/mavia/index.html
import React, { Component } from 'react';
import Alert from './Alert';
import FormWizardTypeSelection from './FormWizard.Types';
import FormWizardBankForm from './FormWizard.Bank';
import FormWizardPhoneForm from './FormWizard.Phone';
import FormWizardBusinessForm from './FormWizard.Business';
import $ from 'jquery';

class FormWizard extends Component {
  constructor() {
    super();
    this.state = {
      formType: undefined,
      floatingFormType: undefined,
      completedSteps: 0,
      totalSteps: 3,
      formReady: false // if ready is true, Next button turns green and is able to be clicked
    };
  }
  componentDidMount() { this.updateFormUI(); }
  componentDidUpdate() { this.updateFormUI(); }

  loadStep(direction) {
    // If they're trying to go forward before the form is ready, prevent them
    if ( direction === 1 && !this.state.formReady ) {
      alert('You must complete this step before proceeding.'); // display <Alert /> here: <Alert type="error" headline="Warning!" text="That isn't acceptable, sorry." />
      return;
    }
    // Determine what to do before changing steps
    switch(this.state.completedSteps + direction) {
      default:
      case 0:
        break;
      case 1: // After completing the first step, set the formType from the floatingType
        this.setState({formType: this.state.floatingFormType});
        break;
    }
    // Now increment the state.completedSteps
    switch(direction) {
      default:
      case 1:
        this.stepForward();
        break;
      case -1:
        this.stepBack();
        break;
    }
  }

  callbackComplete(){}

  callbackFormReady(permitted) { this.setState({formReady: permitted}); }
  callbackSelectFormType(selectedType) { this.setState({floatingFormType: selectedType}); }
  callbackBankForm(stuff) { alert(stuff); }
  callbackPhoneForm(stuff) { alert(stuff); }
  callbackBusinessForm(stuff) { alert(stuff); }

  stepBack()    { this.setState({completedSteps: this.state.completedSteps - 1}); }
  stepForward() { this.setState({completedSteps: this.state.completedSteps + 1}); }
  buttonBack(e)    { e.preventDefault(); this.loadStep(-1);    }
  buttonForward(e) { e.preventDefault(); this.loadStep(1);     }
  buttonPrint(e)   {
    e.preventDefault();
    let printWindow = window.open('','','width=768,height=420');
    printWindow.document.write('Subpoena data without website formatting');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }

  getProgressLabel()  { return ( this.state.completedSteps >= this.state.totalSteps ? 'Completed' : this.state.completedSteps + '/' + this.state.totalSteps ); }
  getInnerForm() {
    console.log('Type: '+this.state.formType);
    console.log('Floating type: '+this.state.floatingFormType);
    if ( this.state.completedSteps <= 0 )
      return <FormWizardTypeSelection floatingType={this.state.floatingFormType} permissionCallback={this.callbackFormReady.bind(this)} changeStateCallback={this.callbackSelectFormType.bind(this)} />;
    switch(this.state.formType) {
      default:
        console.log('Return Type selection');
        return <FormWizardTypeSelection
                  state={this.state}
                  callbackInput={this.callbackSelectFormType}
                  callbackComplete={this.callbackFormReady.bind(this)}

          step={this.state.completedSteps} permissionCallback={this.callbackFormReady.bind(this)} changeStateCallback={this.callbackSelectFormType.bind(this)} />;
      case 'phone':
        console.log('Return Phone form');
        return <FormWizardPhoneForm step={this.state.completedSteps} permissionCallback={this.callbackFormReady.bind(this)} changeStateCallback={this.callbackPhoneForm.bind(this)} />;
      case 'bank':
        console.log('Return Bank form');
        return <FormWizardBankForm step={this.state.completedSteps} permissionCallback={this.callbackFormReady.bind(this)} changeStateCallback={this.callbackBankForm.bind(this)} />;
      case 'business':
        console.log('Return Business form');
        return <FormWizardBusinessForm step={this.state.completedSteps} permissionCallback={this.callbackFormReady.bind(this)} changeStateCallback={this.callbackBusinessForm.bind(this)} />;
    }
  }

  updateFormUI() { this.updateProgressBar(); this.updateFormButtons(); }
  updateProgressBar() { $('.FormWizard .progress-bar').css('width', parseFloat(Math.min(this.state.completedSteps, this.state.totalSteps) / this.state.totalSteps)*100 + '%'); }
  updateFormButtons() {
    let
      printButton = $('.FormWizard button.print'),
      backButton = $('.FormWizard button.back'),
      forwardButton = $('.FormWizard button.forward');
    if ( this.state.completedSteps === 0 ) {
      backButton.hide();
      printButton.hide();
      forwardButton.show();
    } else if (this.state.completedSteps === this.state.totalSteps) {
      backButton.show();
      printButton.show();
      forwardButton.hide();
    } else {
      backButton.show();
      printButton.hide();
      forwardButton.show();
    }
  }

  render() {
    return (
      <section className="FormWizard">
        <form>
          <p className="text-right"><small>Prototype v0.0.1</small></p>
          <div className="details-col">
            <img src="/media/images/forms/registration.svg" alt="" />
            <h2>Subpoena Bot</h2>
            <p>
              Complete and print a subpoena from start to finish in seconds.
              Select your type of subpoena to get started.
            </p>
            <a href="#faq">i</a>
          </div>
          <div className="input-col">
            <div className="progress-bar" />
            <div className="input-area">
              <div className="form-alerts-area"></div>
              <button className="print" onClick={this.buttonPrint.bind(this)}>Print</button>
              <p className="progress-counter">{this.getProgressLabel()}</p>
              {this.getInnerForm()}
              <div className="nav-area">
                <button className="back" onClick={this.buttonBack.bind(this)}>Back</button>
                <button className="forward" onClick={this.buttonForward.bind(this)}>Next</button>
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
