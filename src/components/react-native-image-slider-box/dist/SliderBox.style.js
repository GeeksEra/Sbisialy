import { moderateScale } from "react-native-size-matters";
import { theme } from "../../../core/theme";

export default {
  paginationBoxStyle: {
    position: "absolute",
    bottom: moderateScale(-30),
    padding: 0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10,

  },
  dotStyle: {
    width: moderateScale(15),
    height: moderateScale(15),
    borderRadius: moderateScale(10),
    marginHorizontal: moderateScale(-5),
    backgroundColor: theme.colors.white
  }
};
