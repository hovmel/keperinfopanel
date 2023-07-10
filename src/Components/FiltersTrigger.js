import React from 'react';
import {TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import Colors from '../Constants/Colors';
import Up from '../../assets/icons/arrow_up.png';
import Down from '../../assets/icons/arrow_down.png';

const FiltersTrigger = ({onPress, isOpen}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress}>
      <Image source={isOpen ? Down : Up} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: 80,
    width: '100%',
    height: 24,
    zIndex: 999999,
    backgroundColor: Colors.white,
  },
  image: {
    width: 20,
    resizeMode: 'contain',
  },
});

export default FiltersTrigger;

/*import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Colors from "../Constants/Colors";

const FiltersTrigger = ({onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={onPress}>
      <View style={styles.bar} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 100,
    width: '100%',
    backgroundColor: Colors.white,
    paddingVertical: 14,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  bar: {
    width: 40,
    backgroundColor: '#868686',
    height: 4,
    borderRadius: 10
  },
});

export default FiltersTrigger;
*/
