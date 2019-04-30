import React, { Component } from "react";
import { PropTypes } from "prop-types";
import colors from "../styles/colors";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Easing,
  Animated
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positionValue: new Animated.Value(70)
    };

    this.closeNotification = this.closeNotification.bind(this);
    this.animateNotification = this.animateNotification.bind(this);
  }

  animateNotification(value) {
    const { positionValue } = this.state;
    Animated.timing(positionValue, {
      toValue: value,
      duration: 400,
      velocity: 3,
      tension: 2,
      friction: 8,
      easing: Easing.easeOutBack
    }).start();
  }

  closeNotification() {
    this.props.handleCloseNotification();
  }

  render() {
    const { type, firstLine, secondLine, showNotification } = this.props;
    const { positionValue } = this.state;

    showNotification
      ? this.animateNotification(0)
      : this.animateNotification(70);

    return (
      <Animated.View
        style={[{ transform: [{ translateY: positionValue }] }, styles.wrapper]}
      >
        <View style={styles.notificationContent}>
          <Text style={styles.typeText}>{type}</Text>
          <Text style={styles.messageText}>{firstLine}</Text>
          <Text style={styles.messageText}>{secondLine}</Text>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.closeNotification}
        >
          <Icon color={colors.lightGray} name="times" size={20} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

Notification.propTypes = {
  showNotification: PropTypes.bool.isRequired,
  type: PropTypes.string,
  firstLine: PropTypes.string,
  secondLine: PropTypes.string,
  handleCloseNotification: PropTypes.func
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    height: 100,
    width: "100%",
    padding: 15
  },
  notificationContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  typeText: {
    color: colors.darkOrange,
    marginRight: 5,
    fontSize: 14,
    marginBottom: 2
  },
  messageText: {
    marginBottom: 2,
    fontSize: 14
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10
  }
});
