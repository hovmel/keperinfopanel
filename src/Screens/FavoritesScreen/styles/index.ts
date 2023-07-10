import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';
import {Fonts} from '../../../Constants/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  wrapper: {
    paddingHorizontal: 22,
  },
  contentWrapper: {
    paddingHorizontal: 22,
    marginTop: 14,
    marginBottom: 140
  },
  loadingView: {
    alignSelf: 'center',
    marginTop: 30,
  },
  accordionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  starView: {
    marginRight: 15,
  },
  star: {
    width: 20,
    height: 20,
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
