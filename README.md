# React-Form-Wizard
Basic form wizard made in React with modular sub-forms and extensive adaptability.

![Preview of React-Form-Wizard by Dan Lindsey](https://i.imgur.com/i8k7SzS.png)

## States
Simple and intuitive structure that stores all sub-form data for impromptu prefills.

    this.state = {
      form: 'myForm', // the name of your starting form
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

## Mutators
There are 6 standard mutators belonging to the FormWizard parent which are passed as callbacks via props to all sub-forms.

    SetForm(formName) - Changes to a different sub-form
    SetFormReady(ready) - Set the form as ready or unready for submission
    StoreFormStep(step) - Allows the sub-form to change steps
    StoreFormSteps(steps) - Relays to FormWizard the total number of steps for this sub-form
    StoreFormData(formName, formData) - Saves the input data from the sub-form in its appropriate state subset
    SetButtonStates(newButtonStates)  - Set the visibility states of any or all buttons
    
## Sub-Forms
Setting up an array of sub-forms is easy. You can use the mutator callbacks to relay data to the parent Formwizard component.

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
       return this.steps[this.props.rootState.step].bind(this)(e);
     }

     back() {
       alert('Nowhere to go but forward');
     }

     submit() {
       return this.trigger.bind(this)();
     }


     Step1_SetFormType() {
       return new Promise((resolve,reject)=>{
         let selectedForm = $('input[type="radio"]:checked').val(); // using jQuery syntax for readability
         this.props.callbackInput('_type', selectedForm);
         this.props.callbackForm(selectedForm);
       });
     }

 
