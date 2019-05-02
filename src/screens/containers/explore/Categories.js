import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

export default class Categories extends Component {
  get Categories() {
    const { categories } = this.props;
    return categories.map((category, index) => (
      <TouchableOpacity style={styles.card} key={`category-item-${index}`} activeOpacity={0.7}>
        <Image source={category.photo} style={styles.image} />
      </TouchableOpacity>
    ));
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.wrapper}
        horizontal
        showHorizontalScrollIndicator={false}
      >
        {this.Categories}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    width: 100,
    height: 100,
    marginRight: 8,
    marginLeft: 8
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined
  }
});
