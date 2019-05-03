import { TabNavigator, TabBarBottom, StackNavigator } from "react-navigation";
import ExploreContainer from "../screens/containers/ExploreContainer";
import InboxContainer from "../screens/containers/InboxContainer";
import ProfileContainer from "../screens/containers/ProfileContainer";
import SavedContainer from "../screens/containers/SavedContainer";
import TripsContainer from "../screens/containers/TripsContainer";
import CreateList from "../screens/CreateList";
import colors from "../styles/colors";

export const ExploreTab = StackNavigator(
  {
    ExploreContainer: { screen: ExploreContainer },
    CreateList: { screen: CreateList }
  },
  { mode: "modal" }
);

const LoggedInTabNavigator = TabNavigator(
  {
    Explore: { screen: ExploreTab },
    Saved: { screen: SavedContainer },
    Trips: { screen: TripsContainer },
    Inbox: { screen: InboxContainer },
    Profile: { screen: ProfileContainer }
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontWeight: "600",
        marginBottom: 5
      },
      activeTintColor: colors.pink
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom"
  }
);

export default LoggedInTabNavigator;