import React from "react";
import { Dimensions } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import { Icon } from "react-native-elements";

import AddWord from "./screens/addWord";
import Lists from "./screens/lists";

let screen = Dimensions.get("window");
export const Tabs = createBottomTabNavigator({
  "Add Word": {
    screen: AddWord,
    navigationOptions: {
      tabBarLabel: "Add Word",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="ios-add-circle-outline"
          type="ionicon"
          size={28}
          color={tintColor}
        />
      )
    }
  },
  Lists: {
    screen: Lists,
    navigationOptions: {
      tabBarLabel: "Lists",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="list" type="entypo" size={28} color={tintColor} />
      )
    }
  }
});

const NavigationStack = createStackNavigator({
  Tabs: {
    screen: Tabs,
    navigationOptions: {
      gesturesEnabled: false
    }
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      words: []
    };
  }

  render() {
    return <NavigationStack />;
  }
}

export default createAppContainer(NavigationStack);

/*

export const createRootNavigator = () => {
  return createStackNavigator({
    Tabs: {
      screen: Tabs,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  });
};
*/
