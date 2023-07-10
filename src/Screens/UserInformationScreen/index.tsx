import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {translate} from '../../Translations';
import {SimpleButton} from '../../Components/SimpleButton';
import {InformationItem} from './InformationItem';
import Toast from 'react-native-toast-message';
import {customToastConfig} from '../../Styles/customToast';
import {getUserData} from '../../Utils/API/User';
import {SimpleHeader} from '../../Components/Header/SimpleHeader';

const UserInformationScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    getUserData()
      .then(json => {
        console.log(json);
        setUser(json);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Loading user info error: ', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <SimpleHeader text={translate('account_btn')} />
      {isLoading || !user ? (
        <Text>{translate('loading')}</Text>
      ) : (
        <View>
          <View>
            <InformationItem
              header={translate('login_or_number') + ':'}
              data={user.LOGIN}
            />

            <InformationItem
              header={translate('mobile_number') + ':'}
              data={user.PERSONAL_PHONE}
            />

            <InformationItem
              header={translate('name') + ':'}
              data={user.NAME ? user.NAME + user.LAST_NAME : ''}
            />
          </View>

          <View style={styles.separatorLine} />

          {/*<InformationItem
            header={translate('bill_state') + ':'}
            data={translate('active')}
          />

          <InformationItem
            header={translate('bill') + ':'}
            data={'0 ' + translate('rub')}
          />

          <SimpleButton
            text={translate('top_up_bill')}
            onClick={() => {
              Toast.show({
                type: 'custom_info',
                position: 'bottom',
                bottomOffset: 90,
                visibilityTime: 5000,
                autoHide: true,
                text2: translate('promo_period_valid'),
              });
            }}
          />*/}
        </View>
      )}
      <Toast ref={ref => Toast.setRef(ref)} config={customToastConfig} />
    </View>
  );
};

export default UserInformationScreen;
