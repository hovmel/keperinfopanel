import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import MyModal from './MyModal';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

const AllBoardsModal = ({
  isVisible,
  controlFunction,
  boardsList,
  activeBoard,
  setActiveBoard,
}) => {
  return (
    <MyModal isVisible={isVisible} closeFunction={() => controlFunction(false)}>
      <FlatList
        data={boardsList}
        style={styles.wrapper}
        keyExtractor={item => item.Id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => setActiveBoard(item)}
            activeOpacity={0.5}
            style={styles.button}>
            <Text
              style={[
                styles.buttonText,
                activeBoard === item && styles.buttonTextActive,
              ]}>
              {item.Name}
            </Text>
            {/*<Text style={styles.buttonInfo}>
              Object: {item.object.Name} Widgets: {item.widgets.length}
            </Text>*/}
          </TouchableOpacity>
        )}
      />
    </MyModal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 300,
    maxHeight: 300,
  },
  button: {
    paddingVertical: 10,
  },
  buttonText: {
    fontFamily: Fonts.boldFontFamily,
    color: Colors.gray,
    fontSize: 16,
  },
  buttonTextActive: {
    color: Colors.main,
  },
  buttonInfo: {
    color: Colors.lightGray,
    fontSize: 12,
  },
});

export default AllBoardsModal;
