import { DefaultTheme } from "@react-navigation/native";
import colors from "../config/colors";

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme,
    primary: colors.primaryColor,
    background: colors.white,
  },
};
