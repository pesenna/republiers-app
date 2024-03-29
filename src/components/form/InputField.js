import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../styles/colors";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing
} from "react-native";

export default class InputField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secureInput: props.inputType === "password" ? true : false,
      scaleCheckmarkValue: new Animated.Value(0)
    };

    this.toggleShowPassword = this.toggleShowPassword.bind(this);
    this.scaleCheckmark = this.scaleCheckmark.bind(this);
  }

  scaleCheckmark(value) {
    Animated.timing(this.state.scaleCheckmarkValue, {
      toValue: value,
      duration: 400,
      easing: Easing.easeOutBack
    }).start();
  }

  toggleShowPassword() {
    this.setState({ secureInput: !this.state.secureInput });
  }

  render() {
    const {
      labelText,
      labelTextSize,
      textColor,
      borderBottomColor,
      inputType,
      customStyle,
      onChangeText,
      showCheckmark,
      autoFocus,
      autoCapitalize,
      labelTextWeight,
      inputStyle,
      placeholder,
      defaultValue
    } = this.props;
    const { secureInput, scaleCheckmarkValue } = this.state;

    const fontSize = labelTextSize || 14;
    const fontWeight = labelTextWeight || "700";

    const color = textColor || colors.white;
    const inputColor = textColor || colors.white;
    const borderBottom = borderBottomColor || "transparent";
    const keyboardType = inputType === "email" ? "email-address" : "default";

    let customInputStyle = inputStyle || {};

    if (!inputStyle || (inputStyle && !inputStyle.paddingBottom)) {
      customInputStyle.paddingBottom = 5;
    }

    const iconScale = scaleCheckmarkValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.01, 1.6, 1]
    });
    const scaleValue = showCheckmark ? 1 : 0;
    this.scaleCheckmark(scaleValue);

    return (
      <View style={[customStyle, styles.wrapper]}>
        <Text style={[{ fontWeight, color, fontSize }, styles.label]}>
          {labelText}
        </Text>

        {inputType === "password" ? (
          <TouchableOpacity
            style={styles.showButton}
            onPress={this.toggleShowPassword}
          >
            <Text style={[{ color }, styles.showButtonText]}>
              {secureInput ? "Show" : "Hide"}
            </Text>
          </TouchableOpacity>
        ) : null}

        <Animated.View
          style={[
            { transform: [{ scale: iconScale }] },
            styles.checkmarkWrapper
          ]}
        >
          <Icon name="check" color={inputColor} size={20} />
        </Animated.View>

        <TextInput
          autoCorrect={false}
          style={[
            { color: inputColor, borderBottomColor: borderBottom },
            customInputStyle,
            styles.inputField
          ]}
          secureTextEntry={secureInput}
          onChangeText={onChangeText}
          selectionColor={inputColor}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          value={defaultValue}
        />
      </View>
    );
  }
}

InputField.propTypes = {
  labelText: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  labelTextSize: PropTypes.number,
  textColor: PropTypes.string,
  borderBottomColor: PropTypes.string,
  customStyle: PropTypes.object,
  OnChangeText: PropTypes.func,
  showCheckmark: PropTypes.bool.isRequired,
  autoFocus: PropTypes.bool,
  autoCapitalize: PropTypes.bool,
  labelTextWeight: PropTypes.string,
  inputStyle: PropTypes.object,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex"
  },
  label: {
    marginBottom: 20
  },
  inputField: {
    borderBottomWidth: 1,
    paddingTop: 5
  },
  showButton: {
    position: "absolute",
    right: 0
  },
  showButtonText: {
    fontWeight: "700"
  },
  checkmarkWrapper: {
    position: "absolute",
    right: 0,
    bottom: 6
  }
});
