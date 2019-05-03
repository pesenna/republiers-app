import React, { Component } from "react";

import { Provider } from "react-redux";
import store from "./src/redux/store";

import { StatusBar } from 'react-native';

import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import AppNavigationState from './src/navigators/AppNavigator';

import * as firebase from 'firebase';
import { firebaseConfig } from './config';
firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  render() {
    StatusBar.setBarStyle('light-content');

    return (
      <Provider store={store}>
        <AppNavigationState listener={createReduxBoundAddListener('root')} />
      </Provider>
    );
  }
}
