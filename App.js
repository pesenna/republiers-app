import React, { Component } from "react";

import { Provider } from "react-redux";
import store from "./src/redux/store";

import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import AppNavigationState from './src/navigators/AppNavigator';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigationState listener={createReduxBoundAddListener('root')} />
      </Provider>
    );
  }
}
