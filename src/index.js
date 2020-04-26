import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import Model from './model';
import Update from './update';
import View from './view';
import Ignite from './ignite';
import 'tachyons'; 
import './css';

ReactDOM.render(<Root model={Model} update={Update} view={View} ignite={Ignite}/>, document.getElementById("root"));
