import React from "react";
import ReactDOM from "react-dom";
import Model from './model';
import Update from './update';
import View from './view';
import Ignite from './ignite';

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {...Model};
  }

  componentDidMount() {
    Ignite(this.dispatch, Update);
  }

  dispatch = (action) => {
    let oldState = {...this.state};
    let partialState = action(oldState);
    this.setState({...oldState, ...partialState});
  }

  render() {
    return View(this.dispatch, {...this.state}, Update)
  }
};
