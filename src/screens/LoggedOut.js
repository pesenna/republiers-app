import React, { Component } from "react";
import Colors from "../styles/colors";
import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import colors from "../styles/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import RoundedButton from "../components/buttons/RoundedButton";

export default class LoggedOut extends Component {
  onFacebookPress() {
    alert('Facebook button pressed');
  }

  onCreateAccountPress() {
    alert('Create Account button pressed');
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.welcomeWrapper}>
          <Image source={require("../img/logo.png")} style={styles.logo} />
          <Text style={styles.welcomeText}>Welcome to Republiers.</Text>
          <RoundedButton
            text="Continue with Facebook"
            textColor={colors.green01}
            background={colors.white}
            handleOnPress={this.onFacebookPress}
            icon={
              <Icon
                name="facebook"
                size={20}
                style={styles.facebookButtonIcon}
              />
            }
          />
          <RoundedButton
            text="Create Account"
            textColor={colors.white}
            handleOnPress={this.onCreateAccountPress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: "flex",
    backgroundColor: colors.green01
  },
  welcomeWrapper: {
    flex: 1,
    display: "flex",
    marginTop: 30,
    padding: 20
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 50,
    marginBottom: 40
  },
  welcomeText: {
    fontSize: 30,
    color: colors.white,
    fontWeight: "300",
    marginBottom: 40
  },
  facebookButtonIcon: {
    color: colors.green01,
    position: 'relative',
    left: 20,
    zIndex: 8
  }
});
