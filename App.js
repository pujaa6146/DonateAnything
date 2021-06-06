import React from "react";
import Homescreen from "./components/Homescreen";
import Main from "./components/Maincomponent";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Register from "./components/Registerscreen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConfigureStore } from "./redux/Configurestore";

const { persistor, store } = ConfigureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
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
