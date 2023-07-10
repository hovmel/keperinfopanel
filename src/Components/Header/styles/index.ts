import {StyleSheet} from 'react-native';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 30,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontFamily: Fonts.boldFontFamily,
    color: Colors.gray,
    fontSize: 20,
    marginTop: 35,
  },
  backArrowWrapper: {
    paddingVertical: 20,
    width: '20%',
  },
  backArrow: {
    width: 10,
    height: 16,
    transform: [{rotate: '180deg'}],
  },
  placeholder: {
    width: '20%',
    flexDirection: 'row-reverse',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
