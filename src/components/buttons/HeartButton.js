import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default class HeartButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addedToFavorites: false
    };

    this.addToFavorite = this.addToFavorite.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ addedToFavorite: nextProps.selected });
  }

  addToFavorite() {
    const { onPress } = this.props;

    this.setState({ addedToFavorites: !this.state.addedToFavorites }, () => {
      onPress && this.props.onPress();
    });
  }

  render() {
    const { addedToFavorites } = this.state;
    const { color, selectedColor } = this.props;

    const iconName = addedToFavorites ? "heart" : "heart-o";
    const iconColor = addedToFavorites ? selectedColor : color;

    return (
      <TouchableOpacity
        onPress={this.addToFavorite}
        style={styles.favoriteButton}
        activeOpacity={1}
      >
        <View>
          <Icon name={iconName} color={iconColor} size={19} />
          <Icon
            name="heart-o"
            color={color}
            size={19}
            style={[
              { display: addedToFavorites ? "flex" : "none" },
              styles.selectedColor
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  favoriteButton: {},
  selectedColor: {
    position: "absolute",
    left: 0,
    top: 0
  }
});

HeartButton.propTypes = {
  color: PropTypes.string.isRequired,
  selectedColor: PropTypes.string.isRequired,
  itemId: PropTypes.number,
  onPress: PropTypes.func,
  selected: PropTypes.bool
};
