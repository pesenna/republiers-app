import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../styles/colors";

import SearchBar from "../../components/SearchBar";
import Categories from "./explore/Categories";
import Listings from "./explore/Listings";

import categoriesList from "../../data/categories";
import listings from "../../data/listings";

export default class ExploreContainer extends Component {
  static navigationOptions = {
    tabBarLabel: "EXPLORE",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-search" size={25} color={tintColor} />
    )
  };

  renderListings() {
    return listings.map((listing, index) => {
      return (
        <View
        key={`listing-${index}`}>
          <Listings 
          key={`listing-item-${index}`}
          title={listing.title}
          boldTitle={listing.boldTitle}
          listings={listing.listings}
          showAddToFavorites={listing.showAddToFavorites}/>
        </View>
      );
    });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <SearchBar />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <Text style={styles.heading}>Explore Republiers</Text>
          <View style={styles.categories}>
            <Categories categories={categoriesList} />
          </View>
          {this.renderListings()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white
  },
  scrollView: {
    paddingTop: 120
  },
  scrollViewContent: {
    paddingBottom: 80
  },
  categories: {
    marginBottom: 40
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    paddingLeft: 20,
    paddingBottom: 20,
    color: colors.gray04
  }
});
