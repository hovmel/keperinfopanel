import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import AccordionItem from '../AccordionItem';
import Colors from '../../Constants/Colors';
import StarYellow from '../../../assets/icons/favorite_active.png';
import Star from '../../../assets/icons/favorite.png';
import {
  deleteObjectFavorite,
  getUserFavorites,
  setObjectFavorite,
} from '../../Utils/API/Favorites';

const ObjectsPart: React.FC = ({
  objects,
  singleObjectPressed,
  selectedMarker,
  selectedMarkerId,
  searchedObjects,
  isLoaded,
  heightCoeff = 0.73,
  marginBottom = 90,
}) => {
  const [favoriteObjectsIds, setFavoriteObjectsIds] = useState([]);
  const [favoriteObjectsIdsLoading, setFavoriteObjectsIdsLoading] =
    useState<boolean>(true);

  const [itemsBeforeExpand, setItemsBeforeExpand] = useState(0);
  const [objectsToDraw, setObjectsToDraw] = useState();
  const objectsScrollView = useRef(null);

  const nestedIncludes = (object: any): boolean => {
    if (Array.isArray(object)) {
      for (const objectElement of object) {
        if (nestedIncludes(objectElement, object)) {
          return true;
        }
      }
    } else if (object.Id === selectedMarkerId) {
      return true;
    }

    if (object.Items) {
      return nestedIncludes(object.Items);
    }
    return false;
  };

  const starPressed = async item => {
    if (favoriteObjectsIds.includes(item.Id)) {
      setFavoriteObjectsIds(prev => prev.filter(id => id !== item.Id));

      await deleteObjectFavorite(item.Id);
      console.log(`Object with Id ${item.Id} was removed from Favorites`);
    } else {
      setFavoriteObjectsIds(prev => [...prev, item.Id]);

      const res = await setObjectFavorite(item.Id);
      console.log({res});
      console.log(`Object with Id ${res.id} was added to Favorites`);
    }
  };

  const TitleComponent = ({item}) => {
    return (
      <View style={styles.accordionItem}>
        <TouchableOpacity
          style={styles.starView}
          onPress={() => starPressed(item)}
          disabled={favoriteObjectsIdsLoading}
          activeOpacity={0.5}>
          <Image
            source={favoriteObjectsIds.includes(item.Id) ? StarYellow : Star}
            style={[styles.star, !isLoaded && styles.notLoadedStar]}
          />
        </TouchableOpacity>
        <View style={styles.titleBlock}>
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              selectedMarker &&
                item.Id === selectedMarkerId &&
                styles.activeTitle,
            ]}>
            {item.Name || item.name}
          </Text>
          {/* <Text style={styles.description}>{item.Id}</Text>*/}
        </View>
      </View>
    );
  };

  useEffect(() => {
    (async () => {
      setFavoriteObjectsIds(await getUserFavorites());
      setFavoriteObjectsIdsLoading(false);
    })();
  }, []);

  /*useEffect(() => {
    (async () => {
      console.log({favoriteObjectsIds});
    })();
  }, [favoriteObjectsIds]);*/

  const addToExpand = (list, count = 0) => {
    if (!list) {
      if (itemsBeforeExpand !== count) {
        setItemsBeforeExpand(count);
        return;
      }
    }
    for (let i = 0; i < list?.length; i++) {
      const currentObject = list[i];
      if (nestedIncludes(currentObject)) {
        return addToExpand(currentObject?.Items, count + i + 1);
      }
    }
  };

  useEffect(() => {
    if (selectedMarkerId && objects?.length) {
      addToExpand(objects);
    }
  }, [objects]);

  useEffect(() => {
    if (selectedMarkerId) {
      const y = (itemsBeforeExpand - 1) * 34;
      objectsScrollView?.current?.scrollTo({
        y,
        animated: true,
      });
    }
  }, [itemsBeforeExpand]);

  const renderSearchedObjects = (objects: Array<any>) =>
    objects.map(object => (
      <TouchableOpacity
        activeOpacity={0.5}
        key={object.Id}
        style={styles.header}
        onPress={() =>
          singleObjectPressed(object, object.Id, object.Name, object.DeviceType)
        }>
        <TitleComponent item={object} />
      </TouchableOpacity>
    ));

  const nestedObjects = (items: Array<any>) =>
    items.map(item =>
      item?.Items?.length ? (
        <AccordionItem
          key={item.Id}
          childrenStyle={styles.childrenStyle}
          titleComponent={<TitleComponent item={item} />}
          expanded={
            selectedMarker &&
            selectedMarkerId !== item.Id &&
            nestedIncludes(item)
          }
          otherPressFunction={
            /*item.DeviceType === 'Car' ||
            item.Name === 'PLC' ||
            item.Name === 'Кулон ЭКО' ||
            item.Name === 'Eco' ||
            item.Name === 'Smart Relay' ||
            item.Name === 'LiTouch Base Station'*/
            item.DeviceType !== 'None' && item.ProviderType !== 'None'
          }
          onPress={() =>
            singleObjectPressed(item, item.Id, item.Name, item.DeviceType)
          }>
          {nestedObjects(item.Items)}
        </AccordionItem>
      ) : (
        <TouchableOpacity
          activeOpacity={0.5}
          key={item.Id}
          style={styles.header}
          onPress={() =>
            singleObjectPressed(item, item.Id, item.Name, item.DeviceType)
          }>
          <TitleComponent item={item} />
        </TouchableOpacity>
      ),
    );

  return (
    <View
      style={[
        styles.container,
        {height: Dimensions.get('window').height * heightCoeff},
        {marginBottom},
      ]}>
      {searchedObjects ? (
        searchedObjects.length ? (
          <ScrollView contentContainerStyle={{paddingBottom: 100}}>
            {renderSearchedObjects(searchedObjects)}
            {/* <View style={{height: 300}} />*/}
          </ScrollView>
        ) : (
          <Text>No objects found</Text>
        )
      ) : objects?.length ? (
        <ScrollView
          ref={objectsScrollView}
          contentContainerStyle={{paddingBottom: 100}}>
          {nestedObjects(objects)}
        </ScrollView>
      ) : (
        <View style={{alignSelf: 'center', marginTop: 30}}>
          <ActivityIndicator size={'large'} color={Colors.main} />
        </View>
      )}
    </View>
  );
};

export default ObjectsPart;
