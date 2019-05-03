import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet
} from "react-native";
import { PropTypes } from "prop-types";
import colors from "../../../styles/colors";

import HeartButton from "../../../components/buttons/HeartButton";
import Stars from "../../../components/Stars";

export default class Listing extends Component {
  constructor(props) {
    super(props);

    this.renderListings = this.renderListings.bind(this);
  }

  get randomColor() {
    const colorsList = [
      colors.gray04,
      colors.darkOrange,
      colors.black,
      colors.brown01,
      colors.brown02,
      colors.blue,
      colors.green01
    ];

    return colorsList[Math.floor(Math.random() * colorsList.length)];
  }

  renderListings() {
    const { listings, showAddToFavorites, handleAddToFavorites } = this.props;

    return listings.map((listing, index) => {
      return (
        <TouchableOpacity
          style={styles.card}
          key={`listing-${index}`}
          activeOpacity={0.7}
        >
          <View>
            {showAddToFavorites ? (
              <View style={styles.addToFavoriteButton}>
                <HeartButton
                  color={colors.white}
                  selectedColor={colors.pink}
                  onPress={handleAddToFavorites}
                />
              </View>
            ) : null}

            <Image
              style={styles.image}
              resizeMode="contain"
              source={listing.photo}
            />

            <Text style={[{ color: this.randomColor }, styles.listingType]}>
              {listing.type}
            </Text>

            <Text style={styles.listingTitle} numberOfLines={2}>
              {listing.title}
            </Text>

            <Text style={styles.listingPrice}>
              R$ {listing.price} {listing.priceType}
            </Text>

            {listing.stars > 0 ? (
              <Stars votes={listing.stars} size={10} color={colors.green02} />
            ) : null}
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    const { title, boldTitle } = this.props;

    const titleStyle = boldTitle
      ? { fontSize: 22, fontWeight: "600" }
      : { fontSize: 18 };

    return (
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Text style={[titleStyle, styles.title]}>{title}</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllButtonText}>See all</Text>
            <Icon name="angle-right" size={15} color={colors.gray04} />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.scrollView}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 30 }}
        >
          {this.renderListings()}
        </ScrollView>
      </View>
    );
  }
}

Listing.propTypes = {
  title: PropTypes.string.isRequired,
  boldTitle: PropTypes.bool,
  listings: PropTypes.array.isRequired,
  showAddToFavorites: PropTypes.bool,
  handleAddToFavorites: PropTypes.func
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex"
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 21,
    paddingRight: 21
  },
  title: {
    color: colors.gray04
  },
  seeAllButton: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  seeAllButtonText: {
    color: colors.gray04,
    marginRight: 5
  },
  scrollView: {
    marginTop: 20,
    marginLeft: 15,
    marginBottom: 40
  },
  card: {
    marginRight: 7,
    marginLeft: 7,
    width: 150,
    flexDirection: "column",
    minHeight: 100
  },
  image: {
    width: undefined,
    flex: 1,
    height: 100,
    borderRadius: 7,
    marginBottom: 7
  },
  listingTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.gray04,
    marginTop: 2
  },
  listingType: {
    fontWeight: "700",
    fontSize: 10
  },
  addToFavoriteButton: {
    position: "absolute",
    right: 12,
    top: 7,
    zIndex: 2
  },
  listingPrice: {
    color: colors.gray04,
    marginTop: 4,
    marginBottom: 2,
    fontSize: 12,
    fontWeight: "300"
  }
});
