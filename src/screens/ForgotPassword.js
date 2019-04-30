import React, { Component } from "react";
import { View, Text, KeyboardAvoidingView, StyleSheet } from "react-native";
import colors from "../styles/colors";
import InputField from "../components/form/InputField";
import Notification from "../components/Notification";
import NextArrowButton from "../components/buttons/NextArrowButton";
import Loader from "../components/Loader";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValid: true,
      loadingVisible: false,
      validEmail: false,
      emailAddress: ""
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.toggleNextButtonState = this.toggleNextButtonState.bind(this);
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
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

  handleNextButton() {
    this.setState({ loadingVisible: true });
    setTimeout(() => {
      if (this.state.emailAddress === "wrong@email.com") {
        this.setState({ formValid: false });
      } else {
        this.setState({ formValid: true });
      }

      this.setState({ loadingVisible: false });
    }, 2000);
  }

  toggleNextButtonState() {
    const { validEmail } = this.state;

    if (validEmail) {
      return true;
    }

    return false;
  }

  handleCloseNotification() {
    this.setState({ formValid: true });
  }

  render() {
    const { validEmail, loadingVisible, formValid } = this.state;
    const showNotification = formValid ? false : true;
    const background = formValid ? colors.green01 : colors.darkOrange;
    const notificationMarginTop = showNotification ? 0 : -100;

    return (
      <KeyboardAvoidingView style={[{backgroundColor: background}, styles.wrapper]} behavior="padding">
        <View style={styles.form}>
          <Text style={styles.forgotPasswordHeading}>
            Forgot your password?
          </Text>
          <Text style={styles.forgotPasswordSubheading}>
            Enter your email to find your account.
          </Text>
          <InputField
            labelText="EMAIL ADDRESS"
            labelTextSize={14}
            textColor={colors.white}
            borderBottomColor={colors.white}
            inputType="email"
            customStyle={{ marginBottom: 30 }}
            onChangeText={this.handleEmailChange}
            showCheckmark={validEmail}
          />
        </View>
        <View>
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
              firstLine="No account exists for the requested "
              secondLine="email address "
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
    flex: 1,
  },
  form: {
    marginTop: 90,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1
  },
  forgotPasswordHeading: {
    fontSize: 28,
    fontWeight: "300",
    color: colors.white
  },
  forgotPasswordSubheading: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 15,
    marginTop: 10,
    marginBottom: 60
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
