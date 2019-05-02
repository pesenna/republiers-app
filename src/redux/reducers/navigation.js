import createReducer from "../helpers/createReducer";
import { NavigationActions } from "react-navigation";
import { AppNavigator } from "../../navigators/AppNavigator";

// Primeira tela a ser carregada quando o app abrir
const firstAction = AppNavigator.router.getActionForPathAndParams("LoggedOut");
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

export const nav = (state = initialNavState, action) => {
  let nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};