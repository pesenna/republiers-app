import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class InboxContainer extends Component {
  static navigationOptions = {
    tabBarLabel: "INBOX",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-archive" size={25} color={tintColor} />
    )
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Text>Inbox Container</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    padding: 50
  }
});
