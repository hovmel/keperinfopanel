import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {ScreensHeader} from '../../Components/ScreensHeader';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {
  deleteObjectFavorite,
  getUserFavorites,
  setObjectFavorite,
} from '../../Utils/API/Favorites';
import {useSelector} from 'react-redux';
import {
  allObjectsSelector,
  markersToRenderSelector,
  nestedObjectsSelector,
} from '../../models/markers/selectors';
import Star from '../../../assets/icons/favorite.png';
import StarYellow from '../../../assets/icons/favorite_active.png';
import Colors from '../../Constants/Colors';
import {useNavigation} from '@react-navigation/native';

const FavoritesScreen = ({navigation}) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const [favoriteObjectsIds, setFavoriteObjectsIds] = useState([]);
  const [favoriteObjectsIdsLoading, setFavoriteObjectsIdsLoading] =
    useState<boolean>(true);
  const [currentObjects, setCurrentObjects] = useState([]);

  const objects = useSelector(allObjectsSelector);

  useEffect(() => {
    (async () => {
      if (objects?.length) {
        const favs = await getUserFavorites();
        setCurrentObjects(
          objects.filter(item => {
            return favs.includes(item.Id);
          }),
        );
        setFavoriteObjectsIds(favs);
        setFavoriteObjectsIdsLoading(false);
      }
    })();
  }, [objects]);

  const openObject = item => {
    navigation.navigate('Map', {objectFromFavorites: item});
  };

  const TitleComponent = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.accordionItem}
        onPress={() => openObject(item)}>
        <TouchableOpacity
          style={styles.starView}
          onPress={() => starPressed(item)}
          disabled={favoriteObjectsIdsLoading}
          activeOpacity={0.2}>
          <Image
            source={favoriteObjectsIds.includes(item.Id) ? StarYellow : Star}
            style={styles.star}
          />
        </TouchableOpacity>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{item.Name}</Text>
          <Text style={styles.description}>{item?.ParentName || ''}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const starPressed = async item => {
    if (!favoriteObjectsIds.includes(item.Id)) {
      setFavoriteObjectsIds(prev => [...prev, item.Id]);

      const res = await setObjectFavorite(item.Id);
      console.log(`Object with Id ${res.id} was added to Favorites`);
    } else {
      setFavoriteObjectsIds(prev => prev.filter(id => id !== item.Id));

      await deleteObjectFavorite(item.Id);
      console.log(`Object with Id ${item.Id} was removed from Favorites`);
    }
  };

  return (
    <View style={styles.container}>
      <ScreensHeader
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <View style={styles.wrapper}>
        {favoriteObjectsIdsLoading || !objects?.length ? (
          <View style={styles.loadingView}>
            <ActivityIndicator size={'large'} color={Colors.main} />
          </View>
        ) : (
          <FlatList
            data={currentObjects}
            renderItem={TitleComponent}
            keyExtractor={item => item.Id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default FavoritesScreen;
