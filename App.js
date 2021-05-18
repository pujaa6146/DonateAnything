import React from "react";
import Homescreen from "./components/Homescreen";
import Main from "./components/Maincomponent";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Register from "./components/Registerscreen";

// export default function App() {
//   return <Main />;
// }

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Homescreen,
    },
    Main: {
      screen: Main,
    },
    Register: {
      screen: Register,
    },
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);
