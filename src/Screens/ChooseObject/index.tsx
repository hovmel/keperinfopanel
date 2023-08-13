import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Image, SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AccordionItem from '../../Components/AccordionItem';
import {styles} from './styles';
import {getAllNestedItems} from '../../Utils/API/Devices';
import {ScreensHeader} from '../../Components/ScreensHeader';
import Colors from '../../Constants/Colors';
import Star from '../../../assets/icons/favorite.png';
import StarYellow from '../../../assets/icons/favorite_active.png';
import Microphone from '../../../assets/icons/microphone.png';
import {
  deleteObjectFavorite,
  getUserFavorites,
  setObjectFavorite,
} from '../../Utils/API/Favorites';
import ObjectsPart from '../../Components/ObjectsPart';
import {useSelector} from 'react-redux';
import {
  allObjectsSelector,
  markersToRenderSelector,
  nestedObjectsSelector,
} from '../../models/markers/selectors';
import useActiveObject from '../../hooks/useActiveObject';
import {translate} from '../../Translations';
import Search from '../../../assets/icons/search2.png';

const ChooseObject = ({route}) => {
  const [search, setSearch] = useState<string>('');
  const [searchedObjects, setSearchedObjects] = useState();
  const [chosenObject, setChosenObject] = useActiveObject();

  const [favoriteObjectsIds, setFavoriteObjectsIds] = useState([]);
  const [favoriteObjectsIdsLoading, setFavoriteObjectsIdsLoading] =
    useState<boolean>(true);
  const [isSearchStarPressed, setSearchStartPressed] = useState(false);

  const {singleObjectPressed} = route.params;

  const objects = useSelector(nestedObjectsSelector);
  const allObjects = useSelector(allObjectsSelector);

  useEffect(() => {
    (async () => {
      setFavoriteObjectsIds(await getUserFavorites());
      setFavoriteObjectsIdsLoading(false);
    })();
  }, []);

  const starPressed = async item => {
    item.isFavorite = !item.isFavorite;
  };

  const handleSearch = (
    val: string,
    searchStarPressed: boolean = isSearchStarPressed,
  ) => {
    setSearch(val);
    if (!val) {
      if (searchStarPressed) {
        return setSearchedObjects(
          allObjects.filter(object => favoriteObjectsIds.includes(object.Id)),
        );
      } else {
        return setSearchedObjects(undefined);
      }
    }
    setSearchedObjects(
      val.length
        ? allObjects.filter(object => {
            let favoriteFlag = true;
            if (searchStarPressed) {
              favoriteFlag = favoriteObjectsIds.includes(object.Id);
            }
            return (
              object.Name?.toLowerCase()?.includes(val.toLowerCase()) &&
              favoriteFlag
            );
          })
        : undefined,
    );
  };

  const searchStarPressed = () => {
    handleSearch(search, !isSearchStarPressed);
    setSearchStartPressed(prev => !prev);
  };

  const microphonePress = () => {};

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <ScreensHeader />

        <View style={styles.inputView}>
          <TouchableOpacity onPress={searchStarPressed} activeOpacity={0.2}>
            <Image
              source={isSearchStarPressed ? StarYellow : Star}
              style={styles.star}
            />
          </TouchableOpacity>

          <TextInput
            placeholder={translate('search_placeholder')}
            defaultValue={search}
            onChangeText={handleSearch}
            style={styles.input}
          />

          <TouchableOpacity activeOpacity={1} disabled>
            <Image source={Search} style={styles.search} />
          </TouchableOpacity>
        </View>

        <ObjectsPart
          objects={objects}
          starPressed={starPressed}
          singleObjectPressed={singleObjectPressed}
          searchedObjects={searchedObjects}
          selectedMarker={chosenObject}
          selectedMarkerId={chosenObject?.Id}
          heightCoeff={0.9}
          marginBottom={0}
          isLoaded
        />
      </ScrollView>
      {/*      <TouchableOpacity onPress={microphonePress} style={styles.micButton}>
        <Image source={Microphone} style={styles.mic} />
      </TouchableOpacity>*/}
    </SafeAreaView>
  );
};

export default ChooseObject;
