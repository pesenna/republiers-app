import { TabNavigator, TabBarBottom } from "react-navigation";
import ExploreContainer from "../screens/containers/ExploreContainer";
import InboxContainer from "../screens/containers/InboxContainer";
import ProfileContainer from "../screens/containers/ProfileContainer";
import SavedContainer from "../screens/containers/SavedContainer";
import TripsContainer from "../screens/containers/TripsContainer";
import colors from "../styles/colors";

const LoggedInTabNavigator = TabNavigator(
  {
    ExploreContainer: { screen: ExploreContainer },
    SavedContainer: { screen: SavedContainer },
    TripsContainer: { screen: TripsContainer },
    InboxContainer: { screen: InboxContainer },
    ProfileContainer: { screen: ProfileContainer }
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
