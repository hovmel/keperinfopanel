import {Dimensions, StyleSheet} from 'react-native';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
  },
  text: {
    fontFamily: Fonts.mainFontFamily,
    color: Colors.gray,
  },
  header: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  activeTitle: {
    color: Colors.main,
  },
  accordionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starView: {
    marginRight: 10,
  },
  star: {
    width: 20,
    height: 20,
  },
  notLoadedStar: {
    opacity: 0,
  },
  titleBlock: {
    width: '100%',
  },
  title: {
    fontFamily: Fonts.mediumFontFamily,
    color: '#262626',
    maxWidth: '76%',
  },
  description: {
    fontSize: 10,
    color: Colors.gray,
    fontFamily: Fonts.mainFontFamily,
  },
  childrenStyle: {
    paddingLeft: 5,
    borderLeftWidth: 1,
    borderColor: '#e1e1e1',
  },
});
