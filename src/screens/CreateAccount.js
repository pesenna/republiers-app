import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../redux/actions";

import { transparentHeaderStyle } from "../styles/navigation";
import colors from "../styles/colors";

import InputField from "../components/form/InputField";
import NextArrowButton from "../components/buttons/NextArrowButton";
import Notification from "../components/Notification";
import Loader from "../components/Loader";
import NavBarButton from "../components/buttons/NavBarButton";

import firebase from "firebase";

class CreateAccount extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: transparentHeaderStyle,
    headerTintColor: colors.white,

    headerRight: null,
    headerLeft: (
      <NavBarButton
        location="left"
        icon={<Icon name="angle-left" color={colors.white} size={30} />}
        handleButtonPress={() => navigation.goBack()}
      />
    )
  });

  constructor(props) {
    super(props);

    this.state = {
      formValid: true,
      validEmail: false,
      emailAddress: "",
      validPassword: false,
      validPasswordCheck: false,
      password: "",
      passwordCheck: "",
      loadingVisible: false,
    };

    this.handleNextButton = this.handleNextButton.bind(this);
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordCheckChange = this.handlePasswordCheckChange.bind(this);
    this.toggleNextButtonState = this.toggleNextButtonState.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  createAccount(emailAddress, password) {
    try {
      firebase
        .auth()
        .createUserAndRetrieveDataWithEmailAndPassword(emailAddress, password)
        .then(() => {
          this.setState({ formValid: true, loadingVisible: false });
        })
        .catch(() => {
          this.setState({ formValid: false, loadingVisible: false });
        });
    } catch {
      this.setState({ formValid: false, loadingVisible: false });
    }
  }

  handleNextButton() {
    const { emailAddress, password, passwordCheck } = this.state;
    this.setState({ loadingVisible: true });

    if(password !== passwordCheck)
    {
      this.setState({ formValid: false, loadingVisible: false });
      return;
    }

    this.createAccount(emailAddress.toLowerCase(), password);
  }

  handleCloseNotification() {
    this.setState({ formValid: true });
  }

  handleEmailChange(email) {
    this.setState({ emailAddress: email });
    this.setState({ formValid: true });

    const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailCheckRegex.test(email)) {
      this.setState({ validEmail: true });
    } else {
      this.setState({ validEmail: false });
    }
  }

  handlePasswordChange(password) {
    this.setState({ password: password });
    this.setState({ formValid: true });

    if (password.length > 4) {
      this.setState({ validPassword: true });
    } else {
      this.setState({ validPassword: false });
    }
  }

  handlePasswordCheckChange(password) {
    this.setState({ passwordCheck: password });
    this.setState({ formValid: true });

    if (password.length > 4) {
      this.setState({ validPasswordCheck: true });
    } else {
      this.setState({ validPasswordCheck: false });
    }
  }

  toggleNextButtonState() {
    const { validEmail, validPassword, validPasswordCheck } = this.state;

    if (validEmail && validPassword && validPasswordCheck) {
      return true;
    }

    return false;
  }

  render() {
    const { formValid, loadingVisible, validEmail, validPassword, validPasswordCheck } = this.state;
    const showNotification = formValid ? false : true;
    const background = formValid ? colors.green01 : colors.darkOrange;
    const notificationMarginTop = showNotification ? 0 : -100;

    console.log(this.props.loggedInStatus);

    return (
      <KeyboardAvoidingView
        style={[{ backgroundColor: background }, styles.wrapper]}
        behavior="padding"
      >
        <View style={styles.scrollViewWrapper}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.loginHeader}>Create Account</Text>
            <InputField
              labelText="EMAIL ADDRESS"
              labelTextSize={14}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="email"
              customStyle={{ marginBottom: 30 }}
              onChangeText={this.handleEmailChange}
              showCheckmark={validEmail}
              autoFocus={true}
            />
            <InputField
              labelText="PASSWORD"
              labelTextSize={14}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="password"
              customStyle={{ marginBottom: 30 }}
              onChangeText={this.handlePasswordChange}
              showCheckmark={validPassword}
            />
            <InputField
              labelText="CONFIRM YOUR PASSWORD"
              labelTextSize={14}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="password"
              customStyle={{ marginBottom: 30 }}
              onChangeText={this.handlePasswordCheckChange}
              showCheckmark={validPasswordCheck}
            />
          </ScrollView>
          <View style={styles.nextButton}>
            <NextArrowButton
              handleNextButton={this.handleNextButton}
              disabled={!this.toggleNextButtonState()}
            />
          </View>
          <View
            style={[
              styles.notificationWrapper,
              { marginBottom: notificationMarginTop }
            ]}
          >
            <Notification
              showNotification={showNotification}
              type="Error"
              typeTextColor={colors.darkOrange}
              firstLine="Your password do not match. "
              secondLine="Please try again "
              handleCloseNotification={this.handleCloseNotification}
            />
          </View>
        </View>
        <Loader animationType="fade" modalVisible={loadingVisible} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flex: 1
  },
  scrollViewWrapper: {
    marginTop: 70,
    flex: 1,
    padding: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  scrollView: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    flex: 1
  },
  loginHeader: {
    fontSize: 34,
    color: colors.white,
    fontWeight: "300",
    marginBottom: 40
  },
  nextButton: {
    alignItems: "flex-end",
    right: 20,
    bottom: 20
  },
  notificationWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%"
  }
});

const mapStateToProps = state => {
  return {
    loggedInStatus: state.loggedInStatus
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccount);
