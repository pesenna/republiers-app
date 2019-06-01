import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../styles/colors";

import SearchBar from "../../components/SearchBar";
import Categories from "./explore/Categories";
import Listings from "./explore/Listings";

import categoriesList from "../../data/categories";

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
      listings: [],
      favouriteListings: []
    };

    this.onCreateListClose = this.onCreateListClose.bind(this);
    this.renderListings = this.renderListings.bind(this);
    this.handleAddToFavorites = this.handleAddToFavorites.bind(this);
    this.loadRepublics = this.loadRepublics.bind(this);
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
    this.loadRepublics();
    this.loadFavorites();
  }

  loadRepublics() {
    let { listings } = this.state;

    firebase
      .database()
      .ref("/republics")
      .once("value", snapshot => {
        if(snapshot.exists()) {
          let republics = JSON.parse(JSON.stringify(snapshot));

          for(var republic in republics) {
            let tempId = JSON.parse(JSON.stringify(republic));
            let republicFirstNode = JSON.parse(JSON.stringify(republics[tempId]));
            let republicList = JSON.parse(JSON.stringify(republicFirstNode));
            
            for(var item in republicList){
              let republicId  = JSON.parse(JSON.stringify(item));
              let republicItem = JSON.parse(JSON.stringify(republicList[republicId]));

              let listingList = [];

              for(var listing in republicItem.listings){
                let listingId = JSON.parse(JSON.stringify(listing));
                let listingItem = JSON.parse(JSON.stringify(republicItem.listings[listingId]));

                listingList.push(listingItem);
              }

              republicItem.listings = listingList;

              listings.push(republicItem);
            }

            this.setState(listings);
          }
        }
      });
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
    let { listings } = this.state;

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
