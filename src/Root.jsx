import React from "react";
import ReactDOM from "react-dom";

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.model = props.model;
    this.update = props.update;
    this.view = props.view;
    this.ignite = props.ignite;
    this.state = {...this.model};
  }

  componentDidMount() {
    this.ignite && this.ignite(this.dispatch, this.update);
  }

  dispatch = (action) => {
    let oldState = {...this.state};
    let newState = action(oldState);
    this.setState(newState);
  }

  render() {
    return this.view(this.dispatch, {...this.state}, this.update)
  }
};
