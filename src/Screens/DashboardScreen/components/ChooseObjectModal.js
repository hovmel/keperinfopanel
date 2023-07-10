import React, {useEffect, useState} from 'react';
import MyModal from './MyModal';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {translate} from '../../../Translations';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';
import {ScreensHeader} from '../../../Components/ScreensHeader';
import {getAllNestedItems} from '../../../Utils/API/Devices';
import StarYellow from '../../../../assets/icons/favorite_active.png';
import Star from '../../../../assets/icons/favorite.png';
import AccordionItem from '../../../Components/AccordionItem';
import {
  deleteObjectFavorite,
  getUserFavorites,
  setObjectFavorite,
} from '../../../Utils/API/Favorites';
import ObjectsPart from '../../../Components/ObjectsPart';
import useActiveObject from '../../../hooks/useActiveObject';

const ChooseObjectModal = ({isVisible, controlFunction, choseObject}) => {
  const [objects, setObjects] = useState([]);

  const [favoriteObjectsIds, setFavoriteObjectsIds] = useState([]);
  const [favoriteObjectsIdsLoading, setFavoriteObjectsIdsLoading] =
    useState(true);
  const [chosenObject, setChosenObject] = useActiveObject();

  useEffect(() => {
    (async () => {
      setObjects(await getAllNestedItems());
      setFavoriteObjectsIds(await getUserFavorites());
      setFavoriteObjectsIdsLoading(false);
    })();
  }, []);

  const starPressed = async item => {
    item.isFavorite = !favoriteObjectsIds.includes(item.Id);
    setObjects([...objects]);

    if (item.isFavorite) {
      const res = await setObjectFavorite(item.Id);
      console.log(`Object with Id ${res.id} was added to Favorites`);
    } else {
      await deleteObjectFavorite(item.Id);
      console.log(`Object with Id ${item.Id} was removed from Favorites`);
    }
  };

  return (
    <MyModal
      style={{width: '90%'}}
      isVisible={isVisible}
      closeFunction={() => controlFunction(false)}>
      <ScrollView style={styles.container}>
        <ObjectsPart
          objects={objects}
          starPressed={starPressed}
          singleObjectPressed={choseObject}
          selectedMarker={chosenObject}
          selectedMarkerId={chosenObject?.Id}
        />
      </ScrollView>
    </MyModal>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.gray,
  },
  container: {
    maxHeight: 400,
  },
  header: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  wrapper: {
    paddingHorizontal: 22,
    width: 300,
  },
  loadingView: {
    alignSelf: 'center',
    marginTop: 30,
  },
  accordionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starView: {
    marginRight: 10,
  },
  star: {
    width: 15,
    height: 15,
  },
  titleBlock: {},
  title: {
    fontFamily: Fonts.mediumFontFamily,
    color: '#262626',
  },
  description: {
    fontSize: 10,
    color: Colors.gray,
    fontFamily: Fonts.mainFontFamily,
  },
});

export default ChooseObjectModal;
