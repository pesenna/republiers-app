import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default class RoundedButton extends Component {
  render() {
    const {
      text,
      textColor,
      background,
      icon,
      handleOnPress,
      loading,
      disabled,
      textSize,
      textWeight,
      iconPosition,
      textAlign,
      borderColor
    } = this.props;
    const backgroundColor = background || "transparent";
    const color = textColor || colors.black;
    const fontSize = textSize || 16;
    const fontWeight = textWeight || "600";
    const alignPosition = textAlign || "center";
    const iconLocation = iconPosition || "left";
    const border = borderColor || colors.white;
    const opacityStyle = disabled || loading ? 0.5 : 1;
    const textOpacity = loading ? 0 : 1;

    const loaderGif =
      backgroundColor === "#ffffff"
        ? require("../../img/loading.gif")
        : require("../../img/whiteLoader.gif");

    return (
      <TouchableOpacity
        style={[
          { opacity: opacityStyle, backgroundColor, borderColor: border },
          styles.wrapper
        ]}
        onPress={handleOnPress}
        activeOpacity={0.7}
        disabled={disabled || loading}
      >
        <View style={styles.buttonTextWrapper}>
          {iconLocation === "left" && !loading ? (
            <View style={{ opacity: opacityStyle }}>{icon}</View>
          ) : null}
          {loading ? (
            <View style={styles.loaderContainer}>
              <Image style={styles.loaderImage} source={loaderGif} />
            </View>
          ) : null}
          <Text
            style={[
              {
                opacity: textOpacity,
                fontSize,
                fontWeight,
                textAlign: alignPosition,
                color
              },
              styles.buttonText
            ]}
          >
            {text}
          </Text>
          {iconLocation === "right" && !loading ? (
            <View style={{ opacity: opacityStyle }}>{icon}</View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }
}

RoundedButton.propTypes = {
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  textSize: PropTypes.number,
  textWeight: PropTypes.string,
  textAlign: PropTypes.string,
  background: PropTypes.string,
  borderColor: PropTypes.string,
  icon: PropTypes.object,
  iconPosition: PropTypes.string,
  handleOnPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 40,
    borderWidth: 1,
    marginBottom: 15,
    alignItems: "center"
  },
  buttonTextWrapper: {
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonText: {
    width: "100%"
  },
  loaderContainer: {
    width: 90,
    height: 90,
    borderRadius: 15,
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -45,
    marginTop: -45
  },
  loaderImage: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 15,
    left: "50%",
    top: "50%",
    marginLeft: -20,
    marginTop: -20
  }
});
