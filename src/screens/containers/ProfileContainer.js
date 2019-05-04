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

  constructor(props) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
  }

  handleSignOut() {
    firebase.auth().signOut();
  }

  sendNotification() {
    let response = fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: {
        to: ''
      }
    })
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Text>Profile Container</Text>
        <Button
          title="Sign out"
          onPress={() => {
            this.handleSignOut();
          }}
        />
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
