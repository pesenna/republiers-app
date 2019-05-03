import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class NavBarButton extends Component {
  render() {
    const {
      location,
      text,
      icon,
      color,
      handleButtonPress,
      disabled
    } = this.props;

    const buttonDisabled = disabled || false;

    const marginPosition =
      location === "right" ? { marginRight: 20 } : { marginLeft: 20 };

    let content;
    if (text) {
      content = (
        <Text style={[{ color }, marginPosition, styles.buttonText]}>
          {text}
        </Text>
      );
    } else if (icon) {
      content = <View style={marginPosition}>{icon}</View>;
    }

    return (
      <TouchableOpacity onPress={handleButtonPress} disabled={buttonDisabled}>
        {content}
      </TouchableOpacity>
    );
  }
}

NavBarButton.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.object,
  handleButtonPress: PropTypes.func.isRequired,
  location: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16
  }
});
