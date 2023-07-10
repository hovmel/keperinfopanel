import {StyleSheet} from 'react-native';
import {Fonts} from '../../../Constants/Fonts';
import Colors from '../../../Constants/Colors';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  graphInner: {
    alignItems: 'center',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  graphWrapper: {
    height: 70,
    marginTop: 20,
    width: '90%',
    marginBottom: 20,
  },
  graphItem: {
    position: 'absolute',
    height: 70,
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  yAxis: {
    position: 'absolute',
    borderLeftWidth: 1,
    height: 90,
    zIndex: 10,
    bottom: -10,
  },
  yAxisInner: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: 12,
    paddingTop: -2,
    width: 20,
  },
  yAxisText: {
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 10,
  },
  bottomLine: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: Colors.gray,
    bottom: -10,
    zIndex: 15,
  },

  yAxisFirst: {
    left: 0,
    borderLeftColor: Colors.graphFirstColor,
  },
  yAxisSecond: {
    right: 0,
    borderLeftColor: Colors.graphSecondColor,
  },
  yAxisThird: {
    right: 20,
    borderLeftColor: Colors.graphThirdColor,
  },

  yAxisInnerFirst: {
    alignItems: 'flex-end',
    left: -24,
  },
  yAxisInnerSecond: {
    alignItems: 'flex-start',
    right: -24,
  },
  yAxisInnerThird: {
    alignItems: 'flex-start',
    right: -21,
  },

  yAxisTextFirst: {
    color: Colors.graphFirstColor,
  },
  yAxisTextSecond: {
    color: Colors.graphSecondColor,
  },
  yAxisTextThird: {
    color: Colors.graphThirdColor,
  },

  button: {
    flexDirection: 'row',
    width: '30%',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
    marginTop: 4,
  },
  buttonBlock: {},
  buttonInfo: {
    fontFamily: Fonts.boldFontFamily,
    fontSize: 10,
    color: Colors.lightGray,
  },
  buttonAvg: {
    fontFamily: Fonts.boldFontFamily,
    fontSize: 10,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  bottomBlock: {},
  bottomTitle: {
    fontFamily: Fonts.boldFontFamily,
    fontSize: 9,
  },
  bottomInfo: {
    fontFamily: Fonts.boldFontFamily,
    fontSize: 9,
    color: Colors.lightGray,
  },
});
