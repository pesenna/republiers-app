import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../styles/colors";

import SearchBar from "../../components/SearchBar";
import Categories from "./explore/Categories";
import Listings from "./explore/Listings";

import categoriesList from "../../data/categories";
import listings from "../../data/listings";

import firebase from 'firebase';

export default class ExploreContainer extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: "EXPLORE",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-search" size={25} color={tintColor} />
    )
  };

  constructor(props) {
    super(props);

    this.state = {
      favouriteListings: []
    };

    this.onCreateListClose = this.onCreateListClose.bind(this);
    this.renderListings = this.renderListings.bind(this);
    this.handleAddToFavorites = this.handleAddToFavorites.bind(this);
    this.loadFavorites = this.loadFavorites.bind(this);
  }

  handleAddToFavorites(listing) {
    const { navigate } = this.props.navigation;
    let { favouriteListings } = this.state;

    const index = favouriteListings.indexOf(listing.id);
    if (index > -1) {
      favouriteListings = favouriteListings.filter(item => item !== listing.id);
      this.setState({ favouriteListings });
    } else {
      navigate("CreateList", {
        listing,
        onCreateListClose: this.onCreateListClose
      });
    }
  }

  componentWillMount() {
    this.loadFavorites();
  }

  loadFavorites() {
    let { favouriteListings } = this.state;
    let currentUser = firebase.auth().currentUser;

    const databaseRef = "/users/" + currentUser.uid + "/favorites/";

    firebase
      .database()
      .ref(databaseRef)
      .once("value", snapshot => {
        if (snapshot.exists()) {
          let favorites = JSON.parse(JSON.stringify(snapshot));

          for(var favorite in favorites) {
            let favName = JSON.parse(JSON.stringify(favorite));
            let ids = JSON.stringify(favorites[favName].itemsId).replace(/[^0-9,]/g, "").split(",");

            for(var id in ids) {
              favouriteListings.push(parseInt(ids[id], 10));
            }
          }

          this.setState({ favouriteListings });
        }
      });

      return favouriteListings;
  }

  onCreateListClose(listingId, listCreated) {
    let { favouriteListings } = this.state;

    if (listCreated) {
      favouriteListings.push(listingId);
    } else {
      favouriteListings = favouriteListings.filter(item => item !== listingId);
    }

    this.setState({ favouriteListings });
  }

  renderListings() {
    return listings.map((listing, index) => {
      return (
        <View key={`listing-${index}`}>
          <Listings
            key={`listing-item-${index}`}
            title={listing.title}
            boldTitle={listing.boldTitle}
            listings={listing.listings}
            showAddToFavorites={listing.showAddToFavorites}
            handleAddToFavorites={this.handleAddToFavorites}
            favouriteListings={this.state.favouriteListings}
          />
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
