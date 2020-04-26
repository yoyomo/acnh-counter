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
    Ignite(this.dispatch);
  }

  dispatch = (action) => {
    let oldState = {...this.state};
    let reduction = Update(oldState, action);
    this.setState(reduction.model);
  }

  render() {
    let model = {...this.state};
    let ViewContent = View(this.dispatch);
    return ViewContent(model)
  }
};
