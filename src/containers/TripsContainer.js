import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class TripsContainer extends Component {
  static navigationOptions = {
    tabBarLabel: 'TRIPS',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="logo-ionic" size={25} color={tintColor} />
    )
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Text>Trips Container</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    padding: 50
  }
});