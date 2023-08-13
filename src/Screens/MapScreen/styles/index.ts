import {Platform, StyleSheet} from "react-native";
import Colors from "../../../Constants/Colors";
import { Fonts } from "../../../Constants/Fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    zIndex: -10,
  },
  searchContainer: {
    position: "absolute",
    alignSelf: "center",
    width: 330,
    height: 45,
    marginTop: 28,
    marginHorizontal: 22,
  },
  leftButton: {
    position: "absolute",
    left: 16,
    bottom: 112,
    zIndex: 999999,
  },
  rightButton: {
    position: "absolute",
    bottom: 112,
    right: 16,
    zIndex: 999999,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === 'android' ? 20 : 40,
    left: 16,
    zIndex: 999,
  },
  backButtonRotated: {
    transform: [{ rotate: "-90deg" }],
  },
  accountButton: {
    position: "absolute",
    top: 20,
    right: 16,
    zIndex: 999,
  },
  filterButton: {
    position: "absolute",
    bottom: 150,
    right: 22,
  },
  searchHelperContainer: {
    position: "absolute",
    alignSelf: "center",
    width: 330,
    maxHeight: 120,
    marginTop: 75,
  },
  userLocationIconContainer: {
    width: 30,
    height: 30,
  },
  userLocationIcon: {
    paddingBottom: 10,
    width: 30,
    height: 30,
  },
  markerImage: {
    width: 100,
    height: 300,
    resizeMode: "contain",
  },
  emptyMarker: {
    width: 1,
    height: 1,
    backgroundColor: "green",
  },
  plugShareIcon: {
    width: 20,
    height: 20,
  },
  inputView: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    width: "70%",
    height: 30,
    justifyContent: "space-between",

    position: "absolute",
    top: Platform.OS === 'android' ? 25 : 45,
    left: "25%",
    zIndex: 100,
  },
  input: {
    marginHorizontal: 10,
    color: "#8c8c8c",
    fontFamily: Fonts.mediumFontFamily,
    fontSize: 12,
    width: "68%",
    height: 36,
  },
  star: {
    width: 20,
    height: 18,
    resizeMode: "contain",
    opacity: 0.5,
  },
  search: {
    width: 20,
    height: 28,
    resizeMode: "contain",
    opacity: 0.5,
  },
});
