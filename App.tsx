import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as RNLocalize from "react-native-localize";
import { setI18nConfig } from "./src/Translations";
import { createStackNavigator } from "@react-navigation/stack";
import LoadingScreen from "./src/Screens/LoadingScreen";
import { getUser } from "./src/Utils/Storage";
import YaMap, { Geocoder, ClusteredYamap } from "react-native-yamap";
import { geocoderAPIKey, yaMapAPIKey } from "./src/Constants/API";
import { Provider } from "react-redux";
import store from "./src/store";
import RootNavigation from "./src/Navigation/RootNavigation";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceCountry from "react-native-device-country";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createStackNavigator();

type State = {
  isLoading: boolean;
  authenticated: boolean;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    setI18nConfig();
    this.state = {
      isLoading: true,
      authenticated: false,
    } as State;
  }

  async authenticate() {
    const userDataString = await getUser();

    if (!userDataString) {
      return;
    }

    console.log("user data get", userDataString);

    this.setState({
      authenticated: true,
      userData: JSON.parse(userDataString),
    });
    return userDataString;

    // const userData = JSON.parse(userDataString);
    // console.log('userl', userData);

    // return logIn(userData.login, userData.password).then(json => {
    //   console.log('user json', json);
    //   if ('token' in json && json.token === userData.token) {
    //     console.log('auth token', json.token);
    //     this.setState({authenticated: true});
    //     return true;
    //   }
    //   return false;
    // });
  }

  componentDidMount() {
    YaMap.init(yaMapAPIKey);
    ClusteredYamap.init(yaMapAPIKey).then((r) =>
      console.log("ClusteredYamap initialized")
    );
    Geocoder.init(geocoderAPIKey);
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
    DeviceCountry.getCountryCode()
      .then((result) => {
        console.log(result, "country info");
        AsyncStorage.setItem("country_code", result?.code);
      })
      .catch((e) => {
        console.log(e, "while getting country");
      });
    this.authenticate().then((response) => {
      if (response) {
        response = JSON.parse(response);
        if (response?.token) {
          console.log("setting to AsyncStorage");
          AsyncStorage.setItem("token", response.token)
            .then(() => {
              console.log("auth completed", response);
            })
            .finally(() =>
              setTimeout(() => this.setState({ isLoading: false }), 1500)
            );
        } else {
          console.log("there is no token in user data");
          setTimeout(() => this.setState({ isLoading: false }), 1500);
        }
      } else {
        console.log("there is no user data");
        setTimeout(() => this.setState({ isLoading: false }), 1500);
      }
    });
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };

  render() {
    if (this.state.isLoading) {
      return (
        <>
          <StatusBar backgroundColor={"transparent"} translucent />
          <LoadingScreen />
        </>
      );
    }

    return (
      <Provider store={store}>
        <StatusBar backgroundColor={"white"} barStyle="dark-content" />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <RootNavigation
              authenticated={this.state.authenticated}
              userData={this.state.userData}
            />
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    );
  }
}

export default App;
