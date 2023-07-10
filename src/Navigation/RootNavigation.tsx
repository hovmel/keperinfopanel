import React, {useEffect, useMemo, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MainNavigation} from './MainNavigation';
import {LoginScreenNavigation} from './LoginScreenNavigation';
import {useSelector} from 'react-redux';
import {signedInSelector} from '../models/user/selectors';
import {useActionWithPayload} from '../hooks/useAction';
import {userActions} from '../models/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import {translationGetters} from '../Translations';
import {useNetInfo} from '@react-native-community/netinfo';
import NoConnection from '../Screens/NoConnection';

const Stack = createStackNavigator();

const RootNavigation: React.FC<{authenticated: boolean; userData: any}> = ({
  authenticated,
  userData,
}) => {
  const [isReady, setIsReady] = useState(false);

  const setLang = useActionWithPayload(userActions.setLang);
  const signedIn = useSelector(signedInSelector);
  const loginSuccess = useActionWithPayload(userActions.loginSuccess);

  const netInfo = useNetInfo();
  const isConnected = useMemo(() => netInfo?.isConnected, [netInfo]);

  useEffect(() => {
    if (userData) {
      loginSuccess({
        token: userData?.token,
      });
    }
  }, [loginSuccess, userData]);

  useEffect(() => {
    (async () => {
      let res = await AsyncStorage.getItem('lang');
      if (!res) {
        const {languageTag} = RNLocalize.findBestAvailableLanguage([
          'en',
          'ru',
        ]);
        res = languageTag || 'en';
      }

      setLang(res);
      setIsReady(true);
    })();
  }, [signedIn]);

  if (!isReady) {
    return null;
  }

  return (
    <Stack.Navigator
      headerMode={'none'}
      initialRouteName={
        authenticated ? 'MainNavigation' : 'LoginScreenNavigation'
      }>
      {!isConnected ? (
        <Stack.Screen name={'NoConnection'} component={NoConnection} />
      ) : signedIn ? (
        <Stack.Screen name={'MainNavigation'} component={MainNavigation} />
      ) : (
        <Stack.Screen
          name={'LoginScreenNavigation'}
          component={LoginScreenNavigation}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigation;
