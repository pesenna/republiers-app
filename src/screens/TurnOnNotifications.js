import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { transparentHeaderStyle } from "../styles/navigation";
import colors from "../styles/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationActions } from "react-navigation";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";

const navigateToTabsAction = NavigationActions.navigate({
  routeName: "LoggedIn"
});

export default class TurnOnNotifications extends Component {
  static navigationOptions = () => ({
    headerLeft: null,
    headerStyle: transparentHeaderStyle,
    gestureEnabled: false
  });

  constructor(props) {
    super(props);

    this.state = {
      pressedNotifyButton: false,
      pressedSkipButton: false
    };

    this.handleNotifyButtonShowUnderlay = this.handleNotifyButtonShowUnderlay.bind(
      this
    );
    this.handleNotifyButtonHideUnderlay = this.handleNotifyButtonHideUnderlay.bind(
      this
    );
    this.handleSkipButtonShowUnderlay = this.handleSkipButtonShowUnderlay.bind(
      this
    );
    this.handleSkipButtonHideUnderlay = this.handleSkipButtonHideUnderlay.bind(
      this
    );
  }

  handleNotifyButtonShowUnderlay() {
    this.setState({ pressedNotifyButton: true });
  }

  handleNotifyButtonHideUnderlay() {
    this.setState({ pressedNotifyButton: false });
  }

  handleSkipButtonShowUnderlay() {
    this.setState({ pressedSkipButton: true });
  }

  handleSkipButtonHideUnderlay() {
    this.setState({ pressedSkipButton: false });
  }

  render() {
    const { pressedNotifyButton, pressedSkipButton } = this.state;

    return (
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Icon name="comments-o" size={46} style={styles.icon} />
          <Text style={styles.title}>Turn on notifications?</Text>
          <Text style={styles.description}>
            We can let you know when someone messages you, or notify about other
            important account activity
          </Text>
          <TouchableHighlight
            style={[
              {
                backgroundColor: pressedNotifyButton
                  ? colors.green02
                  : colors.green01,
                width: 160
              },
              styles.button
            ]}
            onPress={() => this.props.navigation.dispatch(navigateToTabsAction)}
            underlayColor={colors.green02}
            onShowUnderlay={this.handleNotifyButtonShowUnderlay}
            onHideUnderlay={this.handleNotifyButtonHideUnderlay}
          >
            <Text style={[{ color: colors.white }, styles.buttonText]}>
              Yes, notify me
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[
              {
                backgroundColor: pressedSkipButton
                  ? colors.gray01
                  : 'transparent',
                borderColor: colors.green01,
                borderWidth: 2,
                width: 100
              },
              styles.button
            ]}
            onPress={() => this.props.navigation.dispatch(navigateToTabsAction)}
            underlayColor={colors.gray01}
            onShowUnderlay={this.handleSkipButtonShowUnderlay}
            onHideUnderlay={this.handleSkipButtonHideUnderlay}
          >
            <Text style={[{ color: colors.green01 }, styles.buttonText]}>
              Skip
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white
  },
  content: {
    marginTop: 80,
    paddingLeft: 20,
    paddingRight: 30
  },
  icon: {
    color: colors.green01,
    marginBottom: 15
  },
  title: {
    fontSize: 28,
    color: colors.black,
    fontWeight: "600"
  },
  description: {
    fontSize: 16,
    paddingRight: 30,
    marginTop: 15,
    lineHeight: 22
  },
  button: {
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 3,
    marginTop: 40
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center"
  }
});

TurnOnNotifications.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }),
};