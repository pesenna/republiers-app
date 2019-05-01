import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addNavigationHelpers, StackNavigator } from "react-navigation";

import LoggedOut from "../screens/LoggedOut";
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";

export const AppNavigator = StackNavigator({
  LoggedOut: { screen: LoggedOut },
  Login: { screen: Login },
  ForgotPassword: { screen: ForgotPassword }
});

const AppWithNavigationState = ({ dispatch, nav, listener }) => (
  <AppNavigator
    navigation={addNavigationHelpers({
      dispatch,
      state: nav,
      addListener: listener
    })}
  />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);