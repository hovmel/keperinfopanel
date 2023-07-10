import {Dimensions, StyleSheet} from 'react-native';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    marginVertical: 10,
    paddingHorizontal: 22,
  },
  backButton: {
    paddingVertical: 20,
    paddingRight: 20,
  },
  backArrow: {
    width: 20,
    height: 18,
    resizeMode: 'contain',
  },
  inputView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    width: '70%',
    height: '100%',
    justifyContent: 'space-between',
  },
  input: {
    marginHorizontal: 10,
    color: '#8c8c8c',
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 12,
    width: '68%',
    height: 36,
  },
  star: {
    width: 20,
    height: 18,
    resizeMode: 'contain',
    opacity: 0.5,
  },
  search: {
    width: 20,
    height: 28,
    resizeMode: 'contain',
    opacity: 0.5,
  },
  avatarButton: {
    height: 30,
    width: 30,
    borderRadius: 30,
    overflow: 'hidden',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30,
    resizeMode: 'contain',
  },
});
