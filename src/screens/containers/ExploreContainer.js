import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableWithoutFeedback
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../styles/colors";

import SearchBar from "../../components/SearchBar";
import Categories from "./explore/Categories";
import Listings from "./explore/Listings";

import categoriesList from "../../data/categories";

import firebase from "firebase";

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
      favouriteListings: [],
      activeImageUrl: null
    };

    this.onCreateListClose = this.onCreateListClose.bind(this);
    this.renderListings = this.renderListings.bind(this);
    this.handleAddToFavorites = this.handleAddToFavorites.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.loadRepublics = this.loadRepublics.bind(this);
    this.loadFavorites = this.loadFavorites.bind(this);
  }

  componentWillMount() {
    this.loadRepublics();
    this.loadFavorites();

    this.oldPosition = {};
    this.position = new Animated.ValueXY();
    this.dimensions = new Animated.ValueXY();
    this.animation = new Animated.Value(0);
    this.activeImageStyle = null;
  }

  handleClick(listing, view) {
    view.measure((x, y, width, height, pageX, pageY) => {
      this.oldPosition.x = pageX;
      this.oldPosition.y = pageY;
      this.oldPosition.width = width;
      this.oldPosition.height = height;

      this.position.setValue({
        x: pageX,
        y: pageY
      });

      this.dimensions.setValue({
        x: width,
        y: height
      });

      this.setState(
        {
          activeImageUrl: listing.photo
        },
        () => {
          this.viewImage.measure((dx, dy, dWidth, dHeight, dPageX, dPageY) => {
            Animated.parallel([
              Animated.timing(this.position.x, {
                toValue: dPageX,
                duration: 300
              }),
              Animated.timing(this.position.y, {
                toValue: dPageY,
                duration: 300
              }),
              Animated.timing(this.dimensions.x, {
                toValue: dWidth,
                duration: 300
              }),
              Animated.timing(this.dimensions.y, {
                toValue: dHeight,
                duration: 300
              }),
              Animated.timing(this.animation, {
                toValue: 1,
                duration: 300
              })
            ]).start();
          });
        }
      );
    });
  }

  closeModal = () => {
    Animated.parallel([
      Animated.timing(this.position.x, {
        toValue: this.oldPosition.x,
        duration: 300
      }),
      Animated.timing(this.position.y, {
        toValue: this.oldPosition.y,
        duration: 250
      }),
      Animated.timing(this.dimensions.x, {
        toValue: this.oldPosition.width,
        duration: 250
      }),
      Animated.timing(this.dimensions.y, {
        toValue: this.oldPosition.height,
        duration: 250
      }),
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 250
      })
    ]).start(() => {
      this.setState({
        activeImageUrl: null
      });
    });
  };

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

  loadRepublics() {
    let { listings } = this.state;

    firebase
      .database()
      .ref("/republics")
      .once("value", snapshot => {
        if (snapshot.exists()) {
          let republics = JSON.parse(JSON.stringify(snapshot));

          for (var republic in republics) {
            let tempId = JSON.parse(JSON.stringify(republic));
            let republicFirstNode = JSON.parse(
              JSON.stringify(republics[tempId])
            );
            let republicList = JSON.parse(JSON.stringify(republicFirstNode));

            for (var item in republicList) {
              let republicId = JSON.parse(JSON.stringify(item));
              let republicItem = JSON.parse(
                JSON.stringify(republicList[republicId])
              );

              let listingList = [];

              for (var listing in republicItem.listings) {
                let listingId = JSON.parse(JSON.stringify(listing));
                let listingItem = JSON.parse(
                  JSON.stringify(republicItem.listings[listingId])
                );

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

          for (var favorite in favorites) {
            let favName = JSON.parse(JSON.stringify(favorite));
            let ids = JSON.stringify(favorites[favName].itemsId)
              .replace(/[^0-9,]/g, "")
              .split(",");

            for (var id in ids) {
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
            handleClick={this.handleClick}
            favouriteListings={this.state.favouriteListings}
          />
        </View>
      );
    });
  }

  renderListingDetail() {
    const activeImageStyle = {
      width: this.dimensions.x,
      height: this.dimensions.y,
      left: this.position.x,
      top: this.position.y
    };

    const animatedContentY = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-150, 0]
    });

    const animatedContentOpacity = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 1]
    });

    const animatedContentStyle = {
      opacity: animatedContentOpacity,
      transform: [
        {
          translateY: animatedContentY
        }
      ]
    };

    const animatedCrossOpacity = {
      opacity: this.animation
    };

    return (
      <View
        style={StyleSheet.absoluteFill}
        pointerEvents={this.state.activeImageUrl ? "auto" : "none"}
      >
        <View
          style={{ flex: 2, zIndex: 1001 }}
          ref={view => (this.viewImage = view)}
        >
          <Animated.Image
            source={
              this.state.activeImageUrl
                ? { uri: this.state.activeImageUrl }
                : null
            }
            style={[
              {
                resizeMode: "cover",
                top: 0,
                left: 0,
                height: null,
                width: null
              },
              activeImageStyle
            ]}
          />
          <TouchableWithoutFeedback
            style={{ backgroundColor: colors.black }}
            onPress={() => this.closeModal()}
          >
            <Animated.View
              style={[
                { position: "absolute", top: 100, right: 30 },
                animatedCrossOpacity
              ]}
            >
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: "white" }}
              >
                X
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
        <Animated.View
          style={[
            {
              flex: 1,
              zIndex: 1000,
              backgroundColor: "white",
              padding: 20,
              paddingTop: 50
            },
            animatedContentStyle
          ]}
        >
          <Text style={{ fontSize: 24, paddingBottom: 10 }}>Lorem ipsum</Text>
          <Text>
            is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more
            recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </Text>
        </Animated.View>
      </View>
    );
  }

  render() {
    let { activeImageUrl } = this.state;

    return (
      <View style={styles.wrapper}>
        <SearchBar visible={ activeImageUrl ? false : true }/>
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
        {this.renderListingDetail()}
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
