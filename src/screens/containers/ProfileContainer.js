import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import firebase from 'firebase';

export default class ProfileContainer extends Component {
  static navigationOptions = {
    tabBarLabel: "PROFILE",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-contact" size={25} color={tintColor} />
    )
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Text>Profile Container</Text>
        <Button title='Sign out' onPress={() => {firebase.auth().signOut().then(this.props.navigation.navigate('LoggedOut'));}}></Button>
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
