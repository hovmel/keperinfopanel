import React from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {styles} from './styles';
import SearchHelperListItem from './SearchHelperListItem';

const SearchHelper = ({items, onItemPress}) => {
  const renderItem = ({item}) => (
    <SearchHelperListItem text={item.name} onPress={() => onItemPress(item)} />
  );

  return (
    <View>
      {items && items.length > 0 ? (
        <SafeAreaView style={styles.container}>
          <FlatList
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      ) : (
        <View />
      )}
    </View>
  );
};

export default SearchHelper;
