import {StyleSheet} from 'react-native';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -10,
    left: '-1%',
    width: '102%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 100,
    paddingHorizontal: 22,
  },
  item: {
    width: '18%',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  image: {
    width: 32,
    maxHeight: 32,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  text: {
    fontFamily: Fonts.mediumFontFamily,
    color: Colors.gray,
    fontSize: 12,
  },
});
