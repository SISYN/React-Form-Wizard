import React, { Component } from 'react';

class Alert extends Component {
  constructor() {
    super();
    this.state = {key:null};
  }
  alertKey() {
    let
      text = '',
      possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 16; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
  componentWillMount() {
    this.setState({key: this.alertKey()});
  }
  render() {
    return (
      <div className={'alert ' + this.props.type}>
        <input type="checkbox" id={'Alert--'+this.state.key} />
        <label className="close" title="close" htmlFor={'Alert--'+this.state.key}>
          <i className="fa fa-close"></i>
        </label>
        <p className="inner">
          <strong>{this.props.headline}</strong> {this.props.text}
        </p>
      </div>
    );
  }
}

export default Alert;
