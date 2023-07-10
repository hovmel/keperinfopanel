import React, {useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {ListNavigateItem} from './ListNavigateItem';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';

export const NavigationList = ({data}) => {
  const [selectedId, setSelectedId] = useState(null);

  const navigation = useNavigation();

  const renderItem = ({item}) => {
    return (
      <ListNavigateItem
        item={item}
        imageSource={item.icon}
        onPress={() => {
          navigation.navigate(item.navigation.to, item.navigation.params);
          setSelectedId(item.id);
        }}
        isSelected={item.id === selectedId}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};
