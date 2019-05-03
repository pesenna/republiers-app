import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import NavBarButton from "../components/buttons/NavBarButton";
import colors from "../styles/colors";
import { transparentHeaderStyle } from "../styles/navigation";

import InputField from "../components/form/InputField";
import RoundedButton from "../components/buttons/RoundedButton";
import RadioInput from "../components/form/RadioInput";

export default class CreateList extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerStyle: transparentHeaderStyle,
    headerLeft: (
      <NavBarButton
        location="left"
        icon={<Icon name="md-close" color={colors.gray04} size={30} />}
        handleButtonPress={() => navigation.goBack()}
      />
    )
  });

  constructor(props) {
    super(props);

    this.state = {
      privacyOption: "private",
      title: props.navigation.state.params.listing.location,
      loading: false
    };

    this.listCreated = false;
    this.selectPrivacyOption = this.selectPrivacyOption.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCreateList = this.handleCreateList.bind(this);
  }

  componentWillUnmount() {
    const { navigation } = this.props;
    navigation.state.params.onCreateListClose(
      navigation.state.params.listing.id,
      this.listCreated
    );
  }

  handleTitleChange(title) {
    this.setState({ title });
  }

  selectPrivacyOption(privacyOption) {
    this.setState({ privacyOption: privacyOption });
  }

  handleCreateList() {
    const { goBack } = this.props.navigation;
    this.setState({ loading: true });
    this.listCreated = true;

    setTimeout(() => {
      this.setState({ loading: false }, () => {
        goBack();
      });
    }, 2000);
  }

  render() {
    const { privacyOption, title } = this.state;

    return (
      <View style={styles.wrapper}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.heading}>Create a list</Text>
          <View style={styles.content}>
            <View style={styles.inputWrapper}>
              <InputField
                labelText="Title"
                textColor={colors.gray04}
                borderBottomColor={colors.gray06}
                labelTextSize={16}
                labelTextWeight="400"
                // TODO: Change placeholder -> searchbox value (default IFSP)
                placeholder={title}
                defaultValue={title}
                inputType="text"
                showCheckmark={false}
                inputStyle={styles.inputStyle}
                onChangeText={this.handleTitleChange}
              />
            </View>
          </View>
          <View style={styles.privacyOptions}>
            <Text style={styles.privacyHeading}>Privacy</Text>
            <TouchableOpacity
              style={styles.privacyOptionItem}
              activeOpacity={0.7}
              onPress={() => {
                this.selectPrivacyOption("public");
              }}
            >
              <View>
                <Text style={styles.privacyOptionTitle}>Public</Text>
                <Text style={styles.privacyOptionDescription}>
                  Visible to everyone and included on your public Republier
                  profile.
                </Text>
                <View style={styles.privacyRadioInput}>
                  <RadioInput
                    backgroundColor={colors.gray07}
                    borderColor={colors.gray05}
                    selectedBackgroundColor={colors.green01}
                    selectedBorderColor={colors.green01}
                    iconColor={colors.white}
                    selected={privacyOption === "public"}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.privacyOptionItem}
              activeOpacity={0.7}
              onPress={() => {
                this.selectPrivacyOption("private");
              }}
            >
              <View>
                <Text style={styles.privacyOptionTitle}>Private</Text>
                <Text style={styles.privacyOptionDescription}>
                  Visible only to you and any friends you invite.
                </Text>
                <View style={styles.privacyRadioInput}>
                  <RadioInput
                    backgroundColor={colors.gray07}
                    borderColor={colors.gray05}
                    selectedBackgroundColor={colors.green01}
                    selectedBorderColor={colors.green01}
                    iconColor={colors.white}
                    selected={privacyOption === "private"}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.createButton}>
          <RoundedButton
            text="Create"
            textColor={colors.white}
            textAlign="left"
            textSize={20}
            textWeight="300"
            background={colors.green01}
            borderColor="transparent"
            iconPosition="right"
            disabled={!title}
            loading={this.state.loading}
            icon={
              <View style={styles.buttonIcon}>
                <FontAwesomeIcon
                  name="angle-right"
                  color={colors.white}
                  size={30}
                />
              </View>
            }
            handleOnPress={this.handleCreateList}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  },
  scrollView: {},
  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.gray04,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 110
  },
  content: {
    paddingTop: 50
  },
  inputWrapper: {
    paddingLeft: 20,
    paddingRight: 20
  },
  inputStyle: {
    fontSize: 24,
    fontWeight: "400",
    paddingBottom: 30
  },
  privacyOptions: {
    marginTop: 40
  },
  privacyHeading: {
    fontSize: 20,
    fontWeight: "400",
    color: colors.gray04,
    marginBottom: 5,
    paddingLeft: 20,
    paddingRight: 20
  },
  privacyOptionItem: {
    flex: 1,
    padding: 20
  },
  privacyOptionTitle: {
    fontSize: 16,
    fontWeight: "200",
    color: colors.gray04
  },
  privacyOptionDescription: {
    fontSize: 14,
    fontWeight: "200",
    color: colors.gray04,
    marginTop: 10,
    paddingRight: 90
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray06,
    height: 1,
    flex: 1,
    marginLeft: 20,
    marginRight: 20
  },
  privacyRadioInput: {
    position: "absolute",
    top: 0,
    right: 0
  },
  createButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 110
  },
  buttonIcon: {
    position: "absolute",
    right: 0,
    top: "50%",
    marginTop: -16
  }
});
